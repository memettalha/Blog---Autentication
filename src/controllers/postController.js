import Post from '../models/post.js';

export const getPosts = async (req, res) => {
    try {
        const post = await Post.getAll(req.query);
        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
};

export const getPostsById = async (req, res) => {
    try {
        const id = req.params.id
        const post = await Post.getById(id);
        if(!post){
            return res.status(404).json({ message: "Gönderi bulunamadı." }); 
        }
        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu"});
    }
};

export const createPost  = async (req,res) => {
    try {
        const {category_id,title,content} = req.body
        const post = await Post.create(category_id,title,content)
        res.status(201).json(post)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
}

export const deletePost  = async (req,res) => {
    try {
        const {id} = req.params
        const post = await Post.delete(id)
        res.status(201).json({})
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
}

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { category_id, title, content } = req.body; // req.params değil, req.body
        const post = await Post.update(id, category_id, title, content);
        res.status(202).json(post);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Gönderi güncellenirken bir hata oluştu.", error: error.message });
    }
};

export const addTags = async (req, res) =>{
    try {
        const {tag_id} = req.body
        const id = req.params
        console.log(tag_id,id)
        await Post.addTags(Number(tag_id),Number(id))
        res.status(201).json(await Post.getById(id))
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Gönderi güncellenirken bir hata oluştu.", error: error.message });
    }
}

export const deleteTags = async (req, res) =>{
    try {
        const {tag_id} = req.body
        const id = req.params
        console.log(tag_id,id)
        await Post.deleteTags(Number(tag_id),Number(id))
        res.status(202).json(await Post.getById(id))
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Gönderi güncellenirken bir hata oluştu.", error: error.message });
    }
}




