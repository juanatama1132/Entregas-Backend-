import { connect, connection } from "mongoose";
class MongoSingleton {
  static #instance;
  constructor() {
    connect("", { useNewUrlParser: true, useUnifiedTopology: true });
  }
  static getInstance() {
    if (this.#instance) {
      return this.#instance;
    }
    this.#instance = new MongoSingleton();
    return this.#instance;
  }
}

export { MongoSingleton };
