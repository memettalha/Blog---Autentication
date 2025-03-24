import prisma from '../prisma.js';

const Comment = {


   create: async (post_id,content,commenter_name) => {
        try {
            // Prisma ile comment ekliyoruz
            return await prisma.comment.create({
                data: {
                    post_id,
                    commenter_name,
                    content
                }
            });
        } catch (error) {
            console.error(error);
            throw new Error('Comment oluşturulurken bir hata oluştu.');
        }
    },
    
    getAll: async (query_string) => {
        try {
            const { post, commenter } = query_string;
            const query_list = []
            if (post) {
                query_list.push({
                    post_id: Number(post) 
                })
            }
            if (commenter) { 
                query_list.push({
                    commenter_name: commenter
                })
            }
            return await prisma.comment.findMany({
                where:{
                    AND:query_list,
                    deleted_at:null
                }
            }); // Asenkron işlem olduğu için await ekledik
        } catch (error) {
            console.error(error);
            throw new Error('Yorumlar alınırken bir hata oluştu.');
        }
    },
    
    getById: async (id) => {
        try {
            return await prisma.comment.findUnique({
                where: {
                    id: Number(id),
                    deleted_at:null
                }
            });
        } catch (error) {
            console.error(error);
            throw new Error('Veri alınırken bir hata oluştu.');
        }
    },
   
update: async (id, post_id, content, commenter_name) => {
    try {
        return await prisma.comment.update({
            where: {
                id: Number(id)
            },
            data: {
                post_id,
                content,
                commenter_name,
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
        return await prisma.comment.update({
            where: {
                id: Number(id)
            }

        });
    } catch (error) {
        console.error(error);
        throw new Error('Kategori silinirken bir hata oluştu.');
    }
}
};

export default Comment;