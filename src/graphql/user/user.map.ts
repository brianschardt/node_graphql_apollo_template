import { resolver } from 'graphql-sequelize';
import { User } from '../../models';
import to from 'await-to-js';

export const UserMap = {
    company: resolver(User.associations.company),
};