export interface IUser {
    _id: string;
    username: string;
    email: string;
    token?: string;
  }

  export interface IWorkHistoryItem {
    position: string;
    company: string;
    startDate: Date;
    endDate: Date;
    description: string;
  }

export interface IUserMethods {
    isCorrectPassword(password: string): Promise<boolean>;
  }

export interface UserPayload {
    username: string;
    email: string;
    _id: string;
  }  