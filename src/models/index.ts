import { Sequelize } from 'sequelize-typescript';
import { ENV } from '../config/env.config';

// Sequelize.Promise = <any>global.Promise;
import * as Bluebird from 'bluebird';

// export const Promise: typeof Bluebird;
export type Promise<T> = Bluebird<T>;
export default Promise;



export const sequelize = new Sequelize({
        database: ENV.DB_NAME,
        dialect: ENV.DB_DIALECT,
        username: ENV.DB_USER,
        password: ENV.DB_PASSWORD,
        logging: false,
        storage: ':memory:',
        modelPaths: [__dirname + '/*.model.ts'],
        modelMatch: (filename, member) => {
           return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
        },
});
export { User } from './user.model';
export { Company } from './company.model';

