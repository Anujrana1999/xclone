import { Schema, model } from "mongoose";


const postSchema = new Schema({
    post: {
        type: String,
        required: true
    },
    postimage: {
        type: String,
    },
    user: {
        type: String,
    },
    timestamp: {
        date: Date,
    }
})

const Post = model('posts', postSchema);

export default Post;