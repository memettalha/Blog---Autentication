import { Router } from 'express';
import { getPosts, getPostsById,  createPost, deletePost, updatePost,addTags,deleteTags} from '../controllers/postController.js';

const router = Router()
router.get('/',getPosts)
router.get('/:id',getPostsById)
router.post('/',createPost)
router.delete('/:id',deletePost)
router.put('/:id',updatePost)
router.post('/:id/tags',addTags)
router.delete('/:id/tags',deleteTags)



export default router