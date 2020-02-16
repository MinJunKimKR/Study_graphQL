import { GraphQLServer } from "graphql-yoga";
import schema from "./schema";
import "./env";

// const typeDefs = `
//   type Query {
//     hello(name: String): String!
//   }
// `;

// const resolvers = {
//   Query: {
//     hello: (_, { name }) => `Hello ${name || "World"}`
//   }
// };

// const server = new GraphQLServer({ typeDefs, resolvers });
const server = new GraphQLServer({ schema }); 
server.start(() => console.log("Server is running on localhost:4000"));
