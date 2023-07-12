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
  birthDate: { type: Date, requiered: true },
  age: {
    type: Number,
  },
  password: { type: String },
  phone: { String },
  adress: [
    {
      streetName: { String },
      number: { Number },
      floor: { Number },
      door: { String },
      zipCode: { String },
      country: { String },
      state: { String },
    },
  ],
  // cartId: { type: Schema.Types.ObjectId, ref: "carts" },
  cartId: { type: String, default: "" },
  role: { type: String, default: "user" },
  documents: [
    {
      name: { type: String },
      reference: { type: String },
    },
  ],
  last_connection: { type: Date },
});
// UserSchema.pre("find", function () {
//   this.populate("carts._id");
//   // this.populate("products.code").populate("users.userId");
// });
const UserModel = model(collection, UserSchema);
export default UserModel;