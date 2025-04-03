import { PrismaClient } from "@prisma/client";
import  argon2  from "argon2";
const prisma = new PrismaClient()

const RefreshToken = {
    
   create: async (user_id,expires_at) => {
    try {
        // Prisma ile comment ekliyoruz
        return await prisma.refreshToken.create({
            data:{
                expires_at,
                user_id
            }
        });
    } catch (error) {
        console.error(error);
        throw new Error('RefreshToken oluşturulurken bir hata oluştu.');
    }
},
check: async (user_id) => {
    try {
        return await prisma.refreshToken.findFirst({
            where:{
                user_id:Number(user_id),
                revoked_at:null,
                expires_at:{
                    gte:new Date()
                }
            }
        }); 
    } catch (error) {
        console.error(error);
        throw new Error('RefreshToken alınırken bir hata oluştu.');
    }},
    cancel:async (user_id) => {
        try {
            return await prisma.refreshToken.updateMany({
                where:{
                    user_id:Number(user_id),
                    revoked_at:null,
                    expires_at:{
                        gte:new Date()
                    }
                },
                data:{
                    revoked_at:new Date()
                }
            }); 
        } catch (error) {
            console.error(error);
            throw new Error('RefreshToken iptal edilirken bir hata oluştu.');
        }}


}

export default RefreshToken