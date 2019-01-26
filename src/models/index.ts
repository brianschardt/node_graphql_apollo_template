import { Sequelize } from 'sequelize-typescript';
import { ENV } from '../config/env.config';

export const sequelize = new Sequelize({
        database: ENV.DB_NAME,
        host: ENV.DB_HOST,
        port: +ENV.DB_PORT,
        dialect: ENV.DB_DIALECT,
        username: ENV.DB_USER,
        password: ENV.DB_PASSWORD,
        operatorsAliases: false,
        logging: false,
        storage: ':memory:',
        modelPaths: [__dirname + '/*.model.ts'],
        modelMatch: (filename, member) => {
           return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
        },
});
export { User } from './user.model';
export { Company } from './company.model';

