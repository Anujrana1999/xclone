import express from 'express';
import User from '../models/users';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Post from '../models/post';
dotenv.config()

const router = express.Router();

export const post = router.post('/post', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ error: 'invalid token' })
        }
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECERT!);
        const user = await User.findOne({ email: decodedToken.email })

        if (!user) {
            res.status(401).json({ error: 'Invalid token' })

        }
        const { post } = req.body;
        let postImage: any;
        if (req.file) postImage = req.file
        console.log(postImage)

        await Post.create({
            post,
            postimage: `upload/${postImage.filename}`,
            user: user?.email,
            timestamp: Date.now()
        })

        res.status(201).json({
            message: 'Post created successfully',
            success: true
        })
    } catch (error: any) {
        res.status(401).json({ error: error.message })
    }
})
export const myPost = router.get('/mypost', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ error: 'invalid token' })
        }
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECERT!);
        const user = await User.findOne({ email: decodedToken.email })

        if (!user) {
            res.status(401).json({ error: 'Invalid token' })

        }
        const post = await Post.findOne({ user: user?.email });
        console.log(post, user)
        return res.status(201).json(post)
    } catch (error: any) {
        res.status(401).json({ error: error.message })
    }
})