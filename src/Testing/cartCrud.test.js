import chai from "chai";
import supertest from "supertest";
const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Test Cart Router", () => {
  let id;
  let pId = "";
  it("POST /api/cart/products/:pId crea un nuevo cart", async () => {
    const response = await requester.post(`/api/cart/products/${pId}`);
    expect(response).to.equal(200);
    expect(result.body).to.have.property("payload");
    expect(result.body.payload).to.have.property("_id");
    id = response.body.payload._id;
  });

  it("GET /api/cart/ trae todos los carritos", async () => {
    const response = await requester.get(`/api/cart/`);
    expect(response).to.equal(200);
    expect(response.body.payload).to.be.not.empty;
  });

  it("GET /api/cart/:cId trae un carrito por su id", async () => {
    const response = await requester.get(`/api/cart/${id}`);
    expect(response).to.equal(200);
    expect(response.body.payload).to.have.property("_id");
    expect(response.body.payload._id).to.be.equal(id);
  });
});