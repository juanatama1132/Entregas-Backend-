import { Schema, model } from "mongoose";

const collection = "tickets";
const UserSchema = new Schema({
  code: { type: Number, unique: true, index: true },
  purchase_datetime: { type: Date },
  amount: { Number },
  purchaser: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  age: {
    type: Number,
  },
});
const TicketModel = model(collection, UserSchema);
export default TicketModel;