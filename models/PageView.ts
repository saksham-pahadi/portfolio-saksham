import { Schema, model, models } from "mongoose";

const pageViewSchema = new Schema({
  path: { type: String, required: true, index: true },
  dateKey: { type: String, required: true, index: true },
  count: { type: Number, default: 0 },
}, { timestamps: true });

pageViewSchema.index({ path: 1, dateKey: 1 }, { unique: true });

export default models.PageView || model("PageView", pageViewSchema);
