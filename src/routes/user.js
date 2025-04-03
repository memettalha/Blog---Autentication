//Burası model user.js
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
        throw new Error('Kullanıcı oluşturulurken bir hata oluştu.');
    }
},

getAll: async (query_string) => {
    try {
        return await prisma.user.findMany({
            where:{
                deleted_at:null
            }
        }); 
    } catch (error) {
        console.error(error);
        throw new Error('Kullanıcı alınırken bir hata oluştu.');
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

update: async (id, name, userName,password) => {
try {
    const hashed_password = await argon2.hash(password)
    return await prisma.user.update({
        where:{id:Number(id)},
        data:{
            name,
            userName,
            hashed_password,
        }       
});
} catch (error) {
    console.error(error);
    throw new Error('Kullanıcı güncellenirken bir hata oluştu.');
}
},
//    
delete: async (id) => {
try {
    // Silme yerine `deleted_at` alanını güncelliyoruz
    return await prisma.user.update({
       where:{
            id : Number(id),
       },
       data:{
        deleted_at: new Date()
    } 

    });
} catch (error) {
    console.error(error);
    throw new Error('Kullanıcı silinirken bir hata oluştu.');
}
}
}

//Burası userController içi 



export const createUser  = async (req,res) => {
    try {
        const {name,userName,password} = req.body
        const user = await User.create(name,userName,password)
        res.status(201).json(user)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
}

export const getUsers = async (req, res) => {
    try {
        const user = await User.getAll(req.query);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
};

export const getUsersById = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.getById(id);
        if(!user){
            return res.status(404).json({ message: "Gönderi bulunamadı." }); 
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu"});
    }
};


export const deleteUser  = async (req,res) => {
    try {
        const {id} = req.params
        const user = await User.delete(id)
        res.status(201).json(user)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, userName, password } = req.body; // req.params değil, req.body
        const user = await User.update(id, name, userName, password);
        res.status(202).json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu", error: error.message });
    }
};


//Burası user Route
import { Router } from 'express';

const router = Router()

router.post('/',createUser)
router.get('/',getUsers)
router.get('/:id',getUsersById)
router.delete('/:id',deleteUser)
router.put('/:id',updateUser)

export default router