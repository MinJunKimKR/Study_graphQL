import { GraphQLServer, PubSub } from "graphql-yoga";
import {prisma} from "../generated/prisma-client";
const pubsub = new PubSub();
const NEW_CHAT = "NEW_CHAT";

let chattingLog = [{
  id: 0,
  writer: "admin",
  description: "HELLO"
}];
//기능별 분류 필요
const resolvers = {
  Query: {
    chatting: () => {
      return chattingLog;
    }
  },
  Mutation : {
    write : async (_, {writer, description}) =>{
      const id = chattingLog.length;
      const newChat = {
        id,
        writer,
        description
      };
      await prisma.createChat({writer: writer, description : description});
      chattingLog.push(newChat); //소스 상단의 채팅 배열(날아감) -> 추후 prisma 추가 필요
      pubsub.publish(NEW_CHAT,{
        newChat
      })
      return "YES";
    } 
  },
  Subscription : {
    newChat : {
      subscribe : (_, __, {pubsub}) =>
      pubsub.asyncIterator(NEW_CHAT)
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/chat.graphql",
  resolvers: resolvers,
  context: { pubsub }
});

server.start(() => console.log("Graphql Server Running"));