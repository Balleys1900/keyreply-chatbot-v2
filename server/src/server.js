const { ApolloServer,gql } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
require('dotenv').config();
const express = require('express');
const http = require('http');
const port = process.env.PORT;
const db = require('./config/database.ts');

// Connect database
db.connect();

const typeDefs = gql `
    type Query{
    hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => {
            return 'hello';
        },
    },
};
async function startApolloServer() {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();
    server.applyMiddleware({ app });
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}
startApolloServer();
