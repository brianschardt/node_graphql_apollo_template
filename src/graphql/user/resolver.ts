import { Query } from './user.query';
import { UserMap } from "./user.map";
import { Mutation } from "./user.mutation";

export const resolver = {
  Query: Query,
  User: UserMap,
  Mutation: Mutation
};
