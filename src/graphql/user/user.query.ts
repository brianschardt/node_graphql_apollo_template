import { resolver } from 'graphql-sequelize';
import { User } from '../../models';
import to from 'await-to-js';

export const Query = {
    getUser: resolver(User, {
        before: async (findOptions, {}, {user}) => {
            if(!user){
              throw new Error('User not authenticated');
            }
            return findOptions.where = {id: user.id};
        },
        after: (user) => {
            return user;
        }
    }),
    loginUser: resolver(User, {
        before: async (findOptions, { email }) => {
            findOptions.where = {email};
        },
        after: async (user, { password }) => {
            let err;
            [err, user] = await to(user.comparePassword(password));
            if(err) {
              console.log(err);
              throw new Error(err);
            }

            user.jwt = user.getJwt();
            return user;
        }
    }),
};