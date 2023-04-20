import { Schema, model } from "mongoose";

const collection = "users";
const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  eMail: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  age: {
    type: Number,
  },
  password: { type: String },
  // phone: { String },
  // adress: [
  //   {
  //     streetName: { String },
  //     number: { Number },
  //     floor: { Number },
  //     door: { String },
  //     zipCode: { String },
  //     country: { String },
  //     state: { String },
  //   },
  // ],
  // cartId: { type: Schema.Types.ObjectId, ref: "carts" },
  role: { type: String, default: "user" },
});
UserSchema.pre("find", function () {
  this.populate("carts._id");
  // this.populate("products.code").populate("users.userId");
});
const UserModel = model(collection, UserSchema);
export default UserModel;