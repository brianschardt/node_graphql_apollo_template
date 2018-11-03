import { Query } from './company.query';
import { CompanyMap } from "./company.map";
import { Mutation } from "./company.mutation";

export const resolver = {
  Query: Query,
  Company: CompanyMap,
  Mutation: Mutation,
};
