export interface Discussion {
    _id: string;
    title: string;
    content: string;
    keywords: string[];
    createdAt?: string;
    author: {
      username: string;
    };
  }
  
  export interface CreateDiscussionInput {
    title: string;
    content: string;
    keywords: string[];
  }
  
  export interface CreateDiscussionResponse {
    createDiscussion: Discussion;
  }
  