import prisma from '../prisma.js';
import { SHOW_DELETED } from '../const.js';

const Category = {
    getAll: async (query) => {
        try {
            const { showDeleted } = query;
            console.log(query)
            if (showDeleted === SHOW_DELETED.TRUE) {
                return await prisma.category.findMany();
            } else if (showDeleted === SHOW_DELETED.ONLY_DELETED) {
                return await prisma.category.findMany({
                    where: {
                        deleted_at: {
                            not: null
                        }
                    }
                });
            } else {
                return await prisma.category.findMany({
                    where: {
                        deleted_at: null
                    }
                });
            }
        } catch (error) {
            console.error(error);
            throw new Error('Veri alınırken bir hata oluştu.');
        }
    },
    
    getById: async (id) => {
        try {
            return await prisma.category.findUnique({
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
    
    create: async (category) => {
        try {
            // Prisma ile kategori ekliyoruz
            return await prisma.category.create({
                data: category
            });
        } catch (error) {
            console.error(error);
            throw new Error('Kategori oluşturulurken bir hata oluştu.');
        }
    },

    update: async (id, new_name) => {
        try {
            // Prisma ile kategori güncelliyoruz
            return await prisma.category.update({
                where: {
                    id: Number(id)
                },
                data: {
                    name:new_name
                }
        });
        } catch (error) {
            console.error(error);
            throw new Error('Kategori güncellenirken bir hata oluştu.');
        }
    },

    delete: async (id) => {
        try {
            // Silme yerine `deleted_at` alanını güncelliyoruz
            return await prisma.category.update({
                where: {
                    id: Number(id)
                },
                data: {
                    deleted_at: new Date()// Silinen kategoriler için `deleted_at` tarihini güncelliyoruz
                }
            });
        } catch (error) {
            console.error(error);
            throw new Error('Kategori silinirken bir hata oluştu.');
        }
    }
};


export default Category;