import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: { type: String, default: "Saksham Admin" },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["admin"], default: "admin" },
}, { timestamps: true });

export default models.User || model("User", userSchema);
