import { Schema, model, models } from "mongoose";

const projectSchema = new Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true },
  description: { type: String, required: true },
  stack: { type: [String], default: [] },
  image: { type: String, default: "" },
  liveUrl: { type: String, default: "" },
  githubUrl: { type: String, default: "" },
  featured: { type: Boolean, default: false },
  accent: { type: String, default: "#9b5cff" },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default models.Project || model("Project", projectSchema);
