import { Schema, model, models } from "mongoose";

const postSchema = new Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  cover: { type: String, default: "" },
  tags: { type: [String], default: [] },
  published: { type: Boolean, default: true },
  publishedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default models.Post || model("Post", postSchema);
