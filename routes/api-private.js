const express = require("express");

const router = express.Router();
const admin_controller = require('../controllers/adminController');

router.post('/posts/new', admin_controller.post_create);

router.delete('/posts/:postId', admin_controller.authenticateToken, admin_controller.post_delete);

router.put('/posts/:postId/edit', admin_controller.authenticateToken, admin_controller.post_update);

router.get('/posts', admin_controller.authenticateToken, admin_controller.posts_get);

router.get('/posts/:postId', admin_controller.authenticateToken, admin_controller.post_get);

router.get('/posts/:postId/comments', admin_controller.authenticateToken, admin_controller.comments_get);

router.post('/posts/:postId/comments/new', admin_controller.comment_create);

router.delete('/posts/:postId/:commentId', admin_controller.authenticateToken, admin_controller.comment_delete);

router.post('/login', admin_controller.user_login);


module.exports = router;