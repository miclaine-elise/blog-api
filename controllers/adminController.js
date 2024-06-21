require('dotenv').config();
const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const bcrypt = require('bcrypt')
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');

exports.user_create = asyncHandler(async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
        })
        await user.save();
        return res.send(user)
    } catch {
        res.status(500).send()
    }
});

exports.user_login = asyncHandler(async (req, res, next) => {
    const user = await User.findOne(req.params.username).exec();
    if (await bcrypt.compare(req.body.password, user.password)) {
        const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ token: accessToken });
    } else {
        return res.json({ error: 'Incorrect password or username' })
    }
}
)

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403).json("that didn't work")
        req.user = user
        next()
    })
}
exports.users_get = asyncHandler(async (req, res, next) => {
    const allUsers = await User.find({}, "username password")
        .sort({ username: 1 })
        .exec();

    return res.send(allUsers);
});
exports.post_create = asyncHandler(async (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        summary: req.body.summary,
        text: req.body.text,
        isPublished: req.body.isPublished
    })
    await post.save();
    return res.json(post)
})
exports.post_delete =
    asyncHandler(async (req, res, next) => {
        const post = await Post.findById(req.params.postId).exec();
        if (!post) {
            return res.status(404).json({ error: "could not find resource" });
        }

        await Post.deleteOne({ _id: post._id });
        await Comment.deleteMany({ post: post });
        res.status(200).json({
            message: `deleted admin post ${req.params.postId}`,
        });
    });
exports.post_update = asyncHandler(async (req, res, next) => {
    const post = {
        title: req.body.title,
        summary: req.body.summary,
        text: req.body.text,
        isPublished: req.body.isPublished
    };
    const updatedPost = await Post.findByIdAndUpdate(req.params.postId, post, {});

    res.json(updatedPost);
})

exports.post_get = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId).exec();
    res.json(post);
})


exports.posts_get = [asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find({}, "title createdAt summary isPublished")
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
    console.log("isAdmin");
    console.log(req.body.isAdmin);
    const comment = new Comment({
        post: post,
        author: req.body.author,
        text: req.body.text,
        isAdmin: true,
    })
    await comment.save();
    return res.json(comment)
})
exports.comment_delete = asyncHandler(async (req, res, next) => {
    const comment = await Comment.findById(req.params.commentId).exec();
    if (!comment) {
        return res.status(404).json({ error: "could not find resource" });
    }
    await Comment.deleteOne({ _id: req.params.commentId });
    res.status(200).json({
        message: `deleted comment ${req.params.commentId}`,
    });
})