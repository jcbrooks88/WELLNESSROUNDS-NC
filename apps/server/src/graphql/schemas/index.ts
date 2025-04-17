// Combines all typeDefs
import { userTypeDefs } from "./userTypeDefs.js";
import { postTypeDefs } from "./postTypeDefs.js";
import { mergeTypeDefs } from "@graphql-tools/merge";

export const typeDefs = mergeTypeDefs([userTypeDefs, postTypeDefs]);

