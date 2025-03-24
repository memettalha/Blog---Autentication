import { PrismaClient } from "@prisma/client";
import  argon2  from "argon2";
const prisma = new PrismaClient()

const User = {
    
   create: async (name,userName, password) => {
    const hashed_password = await argon2.hash(password)
    try {
        // Prisma ile comment ekliyoruz
        return await prisma.user.create({
            data:{
                name,
                userName,
                hashed_password,
                role:'member'
            }
        });
    } catch (error) {
        console.error(error);
        throw new Error('Comment oluşturulurken bir hata oluştu.');
    }
},

getAll: async (query_string) => {
    try {
       
        return await prisma.user.findMany(); 
    } catch (error) {
        console.error(error);
        throw new Error('Yorumlar alınırken bir hata oluştu.');
    }
},

getById: async (id) => {
   return prisma.user.findUnique({
    where:{
        id:Number(id),
        deleted_at:null
    }
   })
},
getByUserName: async (userName) => {
    return prisma.user.findUnique({
     where:{
         userName:userName,
         deleted_at:null
     }
    })
 },

update: async (id, name, userName,hashedPassword) => {
try {
    return await prisma.user.update({
        where:{id:Number(id)},
        data:{
            name,
            userName,
            hashedPassword,
        }       
});
} catch (error) {
    console.error(error);
    throw new Error('Kategori güncellenirken bir hata oluştu.');
}
},
//    
delete: async (id) => {
try {
    // Silme yerine `deleted_at` alanını güncelliyoruz
    return await prisma.user.update({
       where:{
            id : Number(id),
            data:{
                deleted_at: new Date()
            } 
       }

    });
} catch (error) {
    console.error(error);
    throw new Error('Kategori silinirken bir hata oluştu.');
}
}
}

export default User