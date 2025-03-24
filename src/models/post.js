import { PrismaClient } from '@prisma/client';

export const SHOW_DELETED = {
    TRUE: 'true',
    FALSE: 'false',
    ONLY_DELETED: 'onlyDeleted'
};

export const POST_STATUS = {
    PUBLISHED: 'published_at',
    DRAFT: 'draft',
    ALL: 'all'
};

const prisma = new PrismaClient()

const Post = {
    getAll: async (query_string) => {
        try {
            const { category, status, showDeleted,tags } = query_string;
            const query_list =[]
  
            // Silinmiş gönderileri filtreleme
            if (showDeleted === SHOW_DELETED.FALSE) {
               query_list.push({
                    deleted_at:null
               })
            } else if (showDeleted === SHOW_DELETED.ONLY_DELETED) {
                query_list.push({
                    deleted_at:{
                        not:null
                    }
                })
            } else if (showDeleted !== SHOW_DELETED.TRUE) {
                query_list.push({
                    deleted_at:null
               })
            }

            // Kategori filtreleme
            if (category) {
                query_list.push({
                    category_id:category
                })
            }

            // Durum filtreleme
            if (status === POST_STATUS.PUBLISHED) {
                query_list.push({
                    published_at: {
                        not:null
                    }
                })
            } else if (status === POST_STATUS.DRAFT) {
                query_list.push({
                    published_at: null
                })
            }
            if(tags){
                const tagsIds=tags.split('.').map(id => Number(id))
                query_list.push({
                    tags:{
                        some:{
                            tag_id:{
                                in:tagsIds
                            }
                        }
                    }
                })
                console.log(tagsIds)
            }
            console.log(query_list)
            return await prisma.post.findMany({
                where:{
                    AND:query_list
                },
                include:{
                    tags:true
                }
            }); // Asenkron işlem olduğu için await ekledik
        } catch (error) {
            console.error(error);
            throw new Error('Gönderiler alınırken bir hata oluştu.');
        }
    },

    create: async (category_id,title,content) => {
        try {
            return await prisma.post.create({
                where:{
                    deleted_at:null
                },
                data:{
                    category_id,
                    title,
                    content
                }
            })
        } catch (error) {
            console.error(error);
            throw new Error('Gönderi oluşturulurken bir hata oluştu.');
        }
    },

    getById: async (id) => {
        try {
            return await prisma.post.findUnique({
                where:{
                    id:Number(id),
                    deleted_at:null
                },
                include:{
                    comments:true,
                    tags:true,
                    category:true,
                }
            })
        } catch (error) {
            console.error(error);
            throw new Error('Gönderi alınırken bir hata oluştu.');
        }
    },

    update: async (id, category_id, title, content, published_at) => {
        try {
            return await prisma.post.update({
                where:{
                    id:Number(id)
                },
                data:{
                    category_id,
                    title,
                    content,
                    published_at
                }
            })
        } catch (error) {
            console.error(error);
            throw new Error('Gönderi güncellenirken bir hata oluştu.');
        }
    },

    delete: async (id) => {
        try {
            return await prisma.post.update({
                where:{
                    id:Number(id)
                },
                data:{
                    deleted_at: new Date()
                }
            })
        } catch (error) {
            console.error(error);
            throw new Error('Gönderi silinirken bir hata oluştu.');
        }
    },
    addTags: async(post_id,tag_id) =>{
        try {
            if (!post_id || !tag_id) {
                throw new Error("post_id ve tag_id değerleri geçerli olmalıdır");
            }
            return await prisma.postTag.create({
                data:{
                    post_id:Number(post_id),
                    tag_id:Number(tag_id)
                }
            })
        } catch (error) {
            console.error(error);
            throw new Error('Gönderi silinirken bir hata oluştu.');
        }
       
    },
    deleteTags:async(post_id,tag_id) => {
        return await prisma.postTag.delete({
            where:{
               post_id_tag_id:{
                    post_id,
                    tag_id
               }
                
            }
        })
       
    }
}



export default Post;
