import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import {createConnection} from "typeorm";
import { UserResolver } from "./resolvers/user_resolver";


async function runServer(){
const connection = await createConnection();
const schema = await buildSchema({
  resolvers: [UserResolver]
});



const server = new ApolloServer({ schema });
await server.listen(8056);

console.log('Server started at port ::8055');
}


runServer();