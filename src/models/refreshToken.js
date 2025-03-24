import { PrismaClient } from "@prisma/client";
import  argon2  from "argon2";
const prisma = new PrismaClient()

const User = {
    
   create: async (user_id,expires_at) => {
    const hashed_password = await argon2.hash(password)
    try {
        // Prisma ile comment ekliyoruz
        return await prisma.refreshToken.create({
            data:{
                expires_at,
                user_id,
                hashed_password
            }
        });
    } catch (error) {
        console.error(error);
        throw new Error('RefreshToken oluşturulurken bir hata oluştu.');
    }
}


}

export default User