import { prisma } from "../../../../generated/prisma-client";
import * as bcrypt from "bcryptjs"; // 비밀번호 를 보안하기 위해 패키지 추가
import * as jwt from "jsonwebtoken";


export default {
    Mutation : {
        login : async (_, args) =>{
            const {email, password} = args;
            const user = await prisma.user({email});
            if(!user){
                throw Error("유저가 없습니다.");
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if(!passwordMatch){
                throw Error("비밀번호가 틀립니다.")
            }
            const token = jwt.sign({id : user.id}, process.env.SECRET);
            return token
        }
    }
};