import { resolver as rs } from 'graphql-sequelize';
import { User } from '../../models';
import to from 'await-to-js';

export const Mutation = {
    createUser: rs(User, {
      before: async (findOptions, { data }) => {
        let err, user;
        [err, user] = await to(User.create(data) );
        if (err) {
          throw err;
        }
        findOptions.where = { id:user.id };
        return findOptions;
      },
      after: (user) => {
        user.login = true;
        return user;
      }
    }),
};