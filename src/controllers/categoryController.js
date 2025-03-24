import Category from '../models/category.js';

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.getAll(req.query);
        res.json(categories);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.getById(id);
        if (!category) {
            return res.status(404).json({ message: "Bir hata oldu" });
        }
        res.json(category);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
};

export const createCategory = async (req,res) => {
    try {
        const {name} = req.body
        const categories = await Category.create({name})
        console.log(categories)
        res.status(201).json({message:'Eklendi'})
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Hata oldu" });
    }
}

export const updateCategory = async (req,res) => {
    try {
        const {id} = req.params
        const {name} = req.body
        const updatedCategory = await Category.update(id,name)
        console.log(updatedCategory)
        res.status(202).json({message:'Eklendi'})

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Hata oldu" });
    }
}

export const deleteCategory =  async (req,res) => {
    try {
        const {id} = req.params
        const deletedCategory  = await Category.delete(id)
        console.log(deletedCategory)
        res.status(204).json({message:"silindi"})
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Hata oldu" });
    }
}
