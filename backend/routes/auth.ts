import express from 'express';
import User from '../models/users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

const router = express.Router();

export const signup = router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (await User.findOne({ username, email })) {
            return res.status(400).json({ error: 'User already exits' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.create({
            username,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            message: 'User created successfully',
            success: true
        })

    } catch (error) {
        res.status(500).json(error)
    }

})

export const login = router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const comparedPassword = await bcrypt.compare(password, user.password);
        if (!comparedPassword) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        const userData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }
        const token = jwt.sign(userData, process.env.TOKEN_SECERT!, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true });

        return res.json({
            message: 'Login sucsessfully',
            success: true,
            user: userData
        })

    } catch (error) {
        res.status(500).json(error)
    }
})
export const logout = router.post('/logout', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ error: 'Invalid token' })
        }
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECERT!);
        const user = await User.findOne({ email: decodedToken.email })

        if (!user) {
            res.status(401).json({ error: 'Invalid token' })

        }
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successfully' })

    } catch (error) {
        res.status(500).json(error)
    }
})