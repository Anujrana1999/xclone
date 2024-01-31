import express from 'express';
import { connect } from './database/connect';
import cors from 'cors';
import { signup, login, logout } from './routes/auth';
import cookieParser from 'cookie-parser'
import multer from 'multer'
import { post, myPost } from './routes/post';

connect();
const app = express();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, './upload');
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// api requests
app.get('/', (req, res) => {
    res.json('server is started at port 4000')
})
app.use('/api', signup)
app.use('/api', login)
app.use('/api', logout)
app.use('/api', upload.single('postimage'), post)
app.use('/api', myPost)


app.listen(4000, () => console.log('server is started'))