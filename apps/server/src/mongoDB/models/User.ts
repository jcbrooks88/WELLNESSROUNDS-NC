import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser, IUserMethods } from "../types/userTypes.js";

// Schema type declaration using generics
type UserModel = mongoose.Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Must match a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
      select: false,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    bio: { type: String, default: "" },
    about: { type: String, default: "" },
    workHistory: {
      type: [
        {
          position: { type: String },
          company: { type: String },
          startDate: { type: Date },
          endDate: { type: Date },
          description: { type: String },
        },
      ],
      default: [],
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

// Virtual full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password comparison method
userSchema.methods.isCorrectPassword = function (password: string) {
  console.log("User password from DB:", this.password);
  return bcrypt.compare(password, this.password);
};

export const User = model<IUser, UserModel>("User", userSchema);
