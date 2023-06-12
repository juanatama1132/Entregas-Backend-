import chai from "chai";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
// import { Jwt } from "jsonwebtoken";
import express from "express";
import authRouter from "../routes/auth.router.js";
import { AuthClass } from "../controlers/auth.controler";
import { createHash } from "crypto";
const expect = chai.expect;
const requester = supertest("http://localhost:8080");
const userServiceMock = {
  getUserByEmail: async (eMail) => await AuthClass.getUserByEmail(eMail),
  //   {

  //     const user = {
  //       firstName: "",
  //       lastName: "",
  //       eMail: "",
  //       age: 47,
  //       password: "",
  //       role: "",
  //     };
  //     return Promise.resolve(user);
  //   },
};
describe("Test Auth Router", () => {
  let app;
  before(() => {
    app = express();
    app.use(express.json());
    app.use("/", authRouter(userServiceMock));
  });

  describe("POST /login", () => {
    it('Retorna cookie "coderCookieToken"', (done) => {
      supertest(app)
        .post("/login")
        .send({ eMail: userServiceMock.eMail, password: "" })
        .expect(200)
        .end((err, res) => {
          if (err) return doesNotReject(err);
          const cookieHandler = res.headers["set-cookie"];
          expect(cookieHandler).to.be.an("array").that.is.not.empty;
          expect(cookieHandler[0]).to.include("coderCookieToken");
          done();
        });
    });
  });
  describe("POST /register", () => {
    it("Registra un Nuevo Usuario", async () => {
      const nwUserMock = {
        firstName: faker.fake.firstName,
        lastName: faker.fake.lastName,
        eMail: faker.fake.eMail,
        age: 47,
        password: createHash(faker.fake.password),
      };
      const { statusCode, ok, _body } = await requester
        .post("/register")
        .send(nwUserMock);
      expect(_body.payload).to.have.property("_id");
    });
  });
  //   describe("TestAuth", () => {
  //     it("", () => {});
  //   });
});