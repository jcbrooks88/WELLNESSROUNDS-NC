import mongoose from "mongoose";

export interface IWorkHistoryItem {
    position: string;
    company: string;
    startDate: Date;
    endDate: Date;
    description: string;
  }
  
export interface IUser {
    _id?: string;
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    bio?: string;
    about?: string;
    workHistory?: IWorkHistoryItem[];
    posts?: string[];
    comments?: string[];
    createdAt?: Date;
    updatedAt?: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
    profileComments?: Array<{
      text: string;
      author: mongoose.Types.ObjectId;
      createdAt?: Date;
    }>;
  }

export interface IUserMethods {
    isCorrectPassword(password: string): Promise<boolean>;
  }

export interface UserPayload {
    username: string;
    email: string;
    _id: string;
  }  