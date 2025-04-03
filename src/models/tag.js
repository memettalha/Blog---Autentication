import prisma from '../prisma.js';

const Tag = {


   create: async (name) => {
        try {
            // Prisma ile comment ekliyoruz
            return await prisma.tag.create({
                data:{
                    name: name
                }
            });
        } catch (error) {
            console.error(error);
            throw new Error('Tag oluşturulurken bir hata oluştu.');
        }
    },
    
    getAll: async (query_string) => {
        try {
           
            return await prisma.tag.findMany(); 
        } catch (error) {
            console.error(error);
            throw new Error('Etiketler alınırken bir hata oluştu.');
        }
    },
    
    getById: async (id) => {
       try {
            return await prisma.tag.findUnique({
                where:({
                    id:Number(id)
                })
            })
       } catch (error) {
            console.error(error);
            throw new Error('Etiketler güncellenirken bir hata oluştu.');
       }
    },
   
update: async (id, name) => {
    try {
        return await prisma.tag.update({
            where:({
                id:Number(id)
            }),
            data:{
                name
            }
    });
    } catch (error) {
        console.error(error);
        throw new Error('Etiketler güncellenirken bir hata oluştu.');
    }
},
//    
delete: async (id) => {
    try {
        // Silme yerine `deleted_at` alanını güncelliyoruz
        return await prisma.tag.delete({
           where:{
            id:Number(id)
           }

        });
    } catch (error) {
        console.error(error);
        throw new Error('Etiketler silinirken bir hata oluştu.');
    }
}
};
export default Tag