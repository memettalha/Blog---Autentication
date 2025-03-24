import prisma from '../prisma.js';

const Tag = {


   create: async (post_id,content,commenter_name) => {
        try {
            // Prisma ile comment ekliyoruz
            return await prisma.tag.create({
                
            });
        } catch (error) {
            console.error(error);
            throw new Error('Comment oluşturulurken bir hata oluştu.');
        }
    },
    
    getAll: async (query_string) => {
        try {
           
            return await prisma.tag.findMany(); 
        } catch (error) {
            console.error(error);
            throw new Error('Yorumlar alınırken bir hata oluştu.');
        }
    },
    
    getById: async (id) => {
        return prisma.tag.findUnique({
            where:{
                id:Number(id)
            } })
    },
   
update: async (id, post_id, content, commenter_name) => {
    try {
        return await prisma.tag.update({
            
            
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
        return await prisma.tag.update({
           

        });
    } catch (error) {
        console.error(error);
        throw new Error('Kategori silinirken bir hata oluştu.');
    }
}
};

export default Tag;