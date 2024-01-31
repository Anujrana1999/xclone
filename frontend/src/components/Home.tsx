import { FormEvent, useEffect, useState } from "react";
import Footer from "./common/footer";
import Header from "./common/header";

interface postData {
    post: string,
    postimage: File | null
}

export default function Home() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const user = localStorage.getItem('loggedIn')
    let userData = {
        id: '',
        email: '',
        username: ''
    }
    if (user) {
        const { id, email, username }: any = JSON.parse(user!);
        userData = {
            id: id,
            email: email,
            username: username
        }
    }
    const [postData, setPostData] = useState<postData>({
        post: '',
        postimage: null
    })
    const handlePost = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('post', postData.post);
        if (postData.postimage) {
            formData.append('postimage', postData.postimage);
        }

        await fetch(`${apiUrl}/post`, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });
    };
    const [myPost, setMyPost] = useState<any>([]);
    const myPosts = async () => {
        // debugger
        const response = await fetch(`${apiUrl}/mypost`, {
            credentials: 'include'
        })
        if (response.ok) {
            try {
                const data = await response.json();
                console.log(data)
                setMyPost([data]);
            } catch (error) {
                console.error('Error parsing JSON response', error);
            }
        }
    }
    useEffect(() => {
        myPosts();
    }, [])
    return (
        <main>
            <Header userData={userData} />
            <div className="max-w-[1200px] m-auto flex py-4">
                {/* left */}
                <div className="flex w-1/5 p-4">
                    <nav className="flex flex-col w-full">
                        <a href="/" className="my-4">Home</a>
                        <a href="/" className="my-4">Your posts</a>
                        <a href="/" className="my-4">Messages</a>
                        <a href="/" className="my-4">Liked</a>
                        <a href="/" className="my-4">Following</a>
                        <a href="/" className="my-4">Profile</a>
                    </nav>
                </div>
                {/* middle */}
                <div className="flex flex-col w-3/5 p-4 border">
                    <nav className="flex flex-row w-full justify-around">
                        <a href="/">All</a>
                        <a href="/">Following</a>
                    </nav>
                    <div className="text-center my-4">
                        <form onSubmit={handlePost} encType="multipart/form-data">
                            <input type="text" name="post" id="post"
                                className="border p-4 w-full text-2xl bg-gray-700" placeholder="What is happing?"
                                value={postData.post}
                                onChange={(e) => setPostData({ ...postData, post: e.target.value })}
                            />
                            <div className="flex justify-between my-4 items-center">
                                <input type="file" name="postimage" id="postimage"
                                    onChange={(e) => e.target.files?.[0] && setPostData({ ...postData, postimage: e.target.files?.[0] })}
                                />
                                <button type="submit"
                                    className="px-6 py-2 bg-sky-500 text-white font-bold rounded-xl"
                                >Post</button>
                            </div>
                        </form>
                    </div>
                    {/* content */}
                    <div className="w-full">
                        <div className="bg-gray-500 p-4 my-4">
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                    <img src="/images/user-logo.png" alt="" srcSet=""
                                        className=" rounded-full w-10" />
                                    <h2 className="font-bold">Anuj Rana</h2>
                                </div>
                                <a href="/">
                                    <img src="images/post-like.png" alt=""
                                        className="w-5 mx-2 object-contain" />
                                </a>
                            </div>
                            {myPost && myPost.map((data: any) => (
                                <div key={data._id}>
                                    <p>{data.post}</p>
                                    <img src={data.postimage} alt=""
                                        className="my-4" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* right */}
                <div className="flex w-1/5 p-4">
                    <div className="w-full flex flex-col">
                        <h2 className="my-4 font-bold">Following</h2>
                        <div className="flex justify-between my-4 items-center">
                            <a href="/">Modi ji</a>
                            <button className="p-2 bg-sky-500 rounded-xl text-white">Unfollow</button>
                        </div>
                        <div className="flex justify-between my-4 items-center">
                            <a href="/">Rahul gandhi</a>
                            <button className="p-2 bg-sky-500 rounded-xl text-white">Unfollow</button>
                        </div>
                        <div className="flex justify-between my-4 items-center">
                            <a href="/">amit shah</a>
                            <button className="p-2 bg-sky-500 rounded-xl text-white">Unfollow</button>
                        </div>
                        <div className="flex justify-between my-4 items-center">
                            <a href="/" >you noob</a>
                            <button className="p-2 bg-sky-500 rounded-xl text-white">Unfollow</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
