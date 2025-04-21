// Combines all typeDefs
import { userTypeDefs } from "./userTypeDefs.js";
//import { postTypeDefs } from "./postTypeDefs.js";
//import commentTypeDefs from "./commentsTypeDefs.js";
import { discussionTypeDefs } from "./discussionsTypeDefs.js";
import { mergeTypeDefs } from "@graphql-tools/merge";

export const typeDefs = mergeTypeDefs([userTypeDefs, discussionTypeDefs]);

