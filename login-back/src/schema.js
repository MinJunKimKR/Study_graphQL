import path from "path";
import { makeExecutableSchema} from "graphql-tools";
import  {fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";

const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql")); // api 폴더 경로에 있는.graphql 파일을 모은다
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js")) // api 폴더 경로에 있는 .js 파일을 모은다

const schema = makeExecutableSchema({
    typeDefs : mergeTypes(allTypes),
    resolvers : mergeResolvers(allResolvers)
});

export default schema;