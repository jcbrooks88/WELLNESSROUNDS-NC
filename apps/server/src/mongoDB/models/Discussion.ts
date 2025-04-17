import mongoose, { Schema } from "mongoose";
import { IDiscussion } from "../types/discussionTypes.js";

const DiscussionSchema = new Schema<IDiscussion>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    keywords: { type: [String], required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Discussion = mongoose.model<IDiscussion>("Discussion", DiscussionSchema);
export default Discussion;
