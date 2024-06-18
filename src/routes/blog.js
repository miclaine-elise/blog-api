import { v4 as uuidv4 } from 'uuid';
import { Router } from 'express';

const router = Router();
const blog_controller = require('../controllers/blogController');

router.get('/posts', blog_controller.posts_get);

router.get('/posts/:postId', blog_controller.post_get);

router.get('/posts/:postId/comments', blog_controller.comments_get);

router.post('/posts/:postId/comments/new', blog_controller.comment_create);

export default router;