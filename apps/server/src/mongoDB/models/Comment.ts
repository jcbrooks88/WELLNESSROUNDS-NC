import mongoose, { Schema } from "mongoose";
import { IComment } from "../types/commentTypes.js";

const commentSchema = new Schema<IComment>(
  {
    content: { type: String, required: true },
    username: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Comment = mongoose.model<IComment>("Comment", commentSchema);
