// Shared types across client and server
export interface IUser {
    _id: string;
    username: string;
    email: string;
    token?: string;
  }
  
  export interface IPost {
    _id: string;
    content: string;
    author: IUser;
  }
  