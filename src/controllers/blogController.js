const Post = require('../models/post');
const Comment = require('../models/comment');

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.post_get = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId).exec();
    res.send(post);
})


exports.posts_get = [asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find({ isPublished: true }, "title createdAt summary isPublished")
        .sort({ createdAt: -1 })
        .exec();

    // return res.send(allPosts);
    res.json({
        allPosts
    });

})];
exports.comments_get = [asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId).exec();
    const allComments = await Comment.find({ post: post }, "author createdAt text isAdmin")
        .sort({ createdAt: -1 })
        .exec();
    res.json({
        allComments
    });

})];
exports.comment_create = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId).exec();
    console.log(post);
    const comment = new Comment({
        post: post,
        author: req.body.author,
        text: req.body.text,
        isAdmin: false,
    })
    await comment.save();
    return res.json(comment)
})



