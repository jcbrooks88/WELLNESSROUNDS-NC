import { Types } from "mongoose";

export interface IPost extends Document {
    content: string;
    author: Types.ObjectId;
    comments: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
  }