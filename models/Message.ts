import { Schema, model, models } from "mongoose";

const messageSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  subject: { type: String, required: true, trim: true },
  message: { type: String, required: true },
  status: { type: String, enum: ["new", "read", "replied"], default: "new", index: true },
  ipHash: { type: String, default: "" },
}, { timestamps: true });

export default models.Message || model("Message", messageSchema);
