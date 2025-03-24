//Bu kısım models/tag.js dosyasında bulunması gerekiyordu import edilemediğinden buraya koydım
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
           
            return await prisma.comment.findMany(); 
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
        return await prisma.comment.delete({
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



//Bu kısım  controller/tag.js altında olması gerekirdi import edilemeğinden dolayı buraya koydum

export  const getTags= async (req, res) => {
    try {
        if (!category_id || !title || !content) {
            throw new Error("category_id, title ve content değerleri geçerli olmalıdır");
        }
        const tags = await Tag.getAll();
        res.json(tags);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
};

export const getTagById = async (req, res) => {
    try {
        const id = req.params.id
        const tag = await Tag.getById(Number(id));
        if(!tag){
            return res.status(404).json({ message: "Etiket bulunamadı" ,error})
        }
        res.json(tag);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
};


export const createTag  = async (req,res) => {
    try {
        const {name} = req.body
        const tag = await Tag.create(name)
        res.status(201).json(tag)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
}

export const deleteTag  = async (req,res) => {
    try {
        const {id} = req.params
        const tag = await Tag.delete(id)
        res.status(201).json(tag)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
}

export const updateTag = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body; // req.params değil, req.body
        const tag = await Tag.update(id, name);
        res.status(202).json(tag);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Etiketler güncellenirken bir hata oluştu.", error: error.message });
    }
};

import { Router } from 'express';
//import { getTags } from '../controllers/tagController';

const router = Router()

router.get('/',getTags)
router.get('/:id',getTagById)
router.post('/',createTag)
router.delete('/:id',deleteTag)
router.put('/:id',updateTag)




export default router