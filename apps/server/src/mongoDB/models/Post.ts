import mongoose, { Schema } from 'mongoose';
import { IPost } from '../types/postTypes.js';

const postSchema = new Schema<IPost>(
  {
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
);

const Post = mongoose.model<IPost>('Post', postSchema);
export default Post;
