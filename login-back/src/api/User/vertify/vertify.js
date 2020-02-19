import {prisma} from "../../../../generated/prisma-client";



export default{
    Mutation : {
        vertify: async (_, args) => {
            const id = args.id;

            const exists = await prisma.$exists.user({ id : id,});

            if(exists){
                const vertify_user = await prisma.user({ id: id })
                if (vertify_user.verify) {
                    throw Error("이미 승인한 ID 입니다.")
                }else{
                    await prisma.updateUser({
                        data : {
                            verify : true
                        },
                        where : {
                            id : id
                        }
                    });
                    return true;
                }
            }else{
                throw Error("해당 아이디가 존재하지 않습니다.")
            }
        } 
    }
}