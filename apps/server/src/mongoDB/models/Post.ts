import mongoose, { Schema } from 'mongoose';
import { IPost } from '../types/postTypes.js';

const postSchema = new Schema<IPost>(
  {
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comments: { type: [mongoose.Schema.Types.ObjectId], ref: 'Comment', default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;


