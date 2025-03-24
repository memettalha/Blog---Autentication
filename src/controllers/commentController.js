import Comment from '../models/comment.js';

export  const getComments= async (req, res) => {
    try {
        const comments = await Comment.getAll(req.query);
        res.json(comments);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
};

export const getCommentById = async (req, res) => {
    try {
        const id = req.params.id
        const comment = await Comment.getById(id);
        if(!comment){
            res.status(404).json({ message: "Hata oldu" ,error})
        }
        res.json(comment);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
};

export const createComment  = async (req,res) => {
    try {
        const {post_id,content,commenter_name} = req.body
        const comment = await Comment.create(post_id,content,commenter_name)
        res.status(201).json(comment)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
}

export const deleteComment  = async (req,res) => {
    try {
        const {id} = req.params
        const comment = await Comment.delete(id)
        res.status(201).json(comment)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
}

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { post_id, commenter_name, content } = req.body; // req.params değil, req.body
        const comment = await Comment.update(id,post_id, commenter_name, content );
        res.status(202).json(comment);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Gönderi güncellenirken bir hata oluştu.", error: error.message });
    }
};

