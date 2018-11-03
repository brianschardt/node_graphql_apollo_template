import * as express  from 'express';
import * as jwt from 'express-jwt';
import { ApolloServer } from 'apollo-server-express';
import { sequelize } from './models';
import { ENV } from './config';

import { resolver as resolvers, schema } from './graphql';
import { createContext, EXPECTED_OPTIONS_KEY } from 'dataloader-sequelize';

const app = express();

const authMiddleware = jwt({
    secret: ENV.JWT_ENCRYPTION,
    credentialsRequired: false,
});
app.use(authMiddleware);

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    playground: true,
    context: ({ req }) => {
        return {
            [EXPECTED_OPTIONS_KEY]: createContext(sequelize),
            user: req.user,
        }
    }
});
server.applyMiddleware({ app });

app.listen({ port: ENV.PORT }, async () => {
    console.log(`🚀 Server ready at http://localhost:${ENV.PORT}${server.graphqlPath}`);
    await sequelize.sync(
        // {force: true},
    );
});