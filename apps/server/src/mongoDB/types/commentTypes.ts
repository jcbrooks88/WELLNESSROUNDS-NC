import mongoose from "mongoose";

export interface IComment extends Document {
    content: string;
    username: string;
    post: mongoose.Schema.Types.ObjectId;
    author: mongoose.Types.ObjectId;
    createdAt: Date;
  }