import { resolver as rs } from 'graphql-sequelize';
import { User, Company } from '../../models';
export const resolver = {

  Query: {
    getCompany: rs(Company)
  },
  Company: {
    users: rs(Company.associations.users)
  }
};
