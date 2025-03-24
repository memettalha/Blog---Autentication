import * as dotenv from 'dotenv';
import express from 'express';
import categoryRoutes from './routes/category.js';
import postRoutes from './routes/post.js';
import commentRoutes from './routes/comment.js'
import tagRoutes from './routes/tag.js'
import userRoutes from './routes/user.js'
import authRoutes from './routes/auth.js'


dotenv.config();
const PORT = 3000;
const app = express();

app.use(express.json());
app.use('/categories', categoryRoutes);
app.use('/posts', postRoutes)
app.use('/comments', commentRoutes)
app.use('/tags', tagRoutes)
app.use('/:id/tags', postRoutes)
app.use('/users',userRoutes)
app.use('/auth',authRoutes)





app.listen(PORT, () => {
    console.log('Sunucu Ayakta');
});
