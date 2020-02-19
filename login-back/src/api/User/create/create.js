import {prisma} from "../../../../generated/prisma-client";
import * as bcrypt from "bcryptjs"; // 비밀번호 를 보안하기 위해 패키지 추가



export default{
    Mutation : {
        create : async (_, args) => {
            const {name, email, password} = args;
            // console.log("name : ", name)
            // console.log("email : ", email)
            // console.log("password : ", password)
            const exists = await prisma.$exists.user({ OR : [{name}, {email}]});
            if(exists){
                throw Error("이메일 또는 이름 중복")
            }
            const hashedPassword = await bcrypt.hash(password,5); //해쉬 함수를 써서 암호화
            await prisma.createUser({name, email, password : hashedPassword});
            return true;
        } 
    }
}