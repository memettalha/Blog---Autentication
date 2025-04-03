import prisma from '../prisma.js';
import { SHOW_DELETED } from '../const.js';
import { PrismaClient } from "@prisma/client";
import  argon2  from "argon2";
const prismaClient = new PrismaClient()

const User = {
    getAll: async (query) => {
        try {
            const { showDeleted } = query;
            if (showDeleted === SHOW_DELETED.TRUE) {
                return await prismaClient.user.findMany();
            } else if (showDeleted === SHOW_DELETED.ONLY_DELETED) {
                return await prismaClient.user.findMany({
                    where: {
                        deleted_at: {
                            not: null
                        }
                    }
                });
            } else {
                return await prismaClient.user.findMany({
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
            return await prismaClient.user.findUnique({
                where: {
                    id: Number(id),
                    deleted_at: null
                }
            });
        } catch (error) {
            console.error(error);
            throw new Error('Veri alınırken bir hata oluştu.');
        }
    },
    
    create: async (user) => {
        try {
            return await prismaClient.user.create({
                data: user
            });
        } catch (error) {
            console.error(error);
            throw new Error('Kullanıcı oluşturulurken bir hata oluştu.');
        }
    },

    update: async (id, userData) => {
        try {
            return await prismaClient.user.update({
                where: {
                    id: Number(id)
                },
                data: userData
            });
        } catch (error) {
            console.error(error);
            throw new Error('Kullanıcı güncellenirken bir hata oluştu.');
        }
    },

    delete: async (id) => {
        try {
            return await prismaClient.user.update({
                where: {
                    id: Number(id)
                },
                data: {
                    deleted_at: new Date()
                }
            });
        } catch (error) {
            console.error(error);
            throw new Error('Kullanıcı silinirken bir hata oluştu.');
        }
    },

    getByUserName: async (userName) => {
        return prismaClient.user.findUnique({
         where:{
             userName:userName,
             deleted_at:null
         }
        })
     },
};

export default User;