const express = require("express");

const router = express.Router();
const blog_controller = require('../controllers/blogController');

router.get('/posts', blog_controller.posts_get);

router.get('/posts/:postId', blog_controller.post_get);

router.get('/posts/:postId/comments', blog_controller.comments_get);

router.post('/posts/:postId/comments/new', blog_controller.comment_create);


module.exports = router;