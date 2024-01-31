import { useState } from "react";
import Modal from "../common/Modal";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const router = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const [triggerSignupModal, setTriggerSignupModal] = useState(false);
    const [triggerForgotpasswordModal, setTriggerForgotpasswordModal] = useState(false);

    // signup
    const [signup, setSignup] = useState({
        username: '',
        email: '',
        password: '',
    })
    const handleSignup = (e: any) => {
        setSignup({ ...signup, [e.target.name]: e.target.value })
    }
    const handleSignupApi = async (e: any) => {
        e.preventDefault();
        const response = await fetch(`${apiUrl}/signup`, {
            method: 'POST',
            body: JSON.stringify(signup),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            setTriggerSignupModal(false);
            toast.success('Signup successfull')
        } else {
            toast.error('User already exits!')
        }
    }

    // login
    const [login, setLogin] = useState({
        email: '',
        password: '',
    })
    const handleLogin = (e: any) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }
    const handleLoginApi = async (e: any) => {
        e.preventDefault();
        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            body: JSON.stringify(login),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        if (response.ok) {
            try {
                const data = await response.json();
                localStorage.setItem('loggedIn', JSON.stringify(data.user));
                setTriggerSignupModal(false);
                router('/');
                toast.success('Login successful');
            } catch (error) {
                console.error('Error parsing JSON response', error);
                toast.error('Login failed');
            }
        } else {
            toast.error('Login failed')
        }
    }
    return (
        <main>
            <div><Toaster /></div>
            {/* signup modal */}
            {triggerSignupModal && (
                <Modal setTriggerSignupModal={setTriggerSignupModal}>
                    <h2 className="my-12 text-center font-bold text-xl">Signup with with us</h2>
                    <form onSubmit={handleSignupApi}>
                        <div className="my-4">
                            <input type="text" name="username" id="username" placeholder="enter username"
                                className="w-full border p-2 rounded-lg bg-gray-500"
                                value={signup.username}
                                onChange={handleSignup}
                            />
                        </div>
                        <div className="my-4">
                            <input type="email" name="email" id="email" placeholder="enter email"
                                className="w-full border p-2 rounded-lg bg-gray-500"
                                value={signup.email}
                                onChange={handleSignup}
                            />
                        </div>
                        <div className="my-4">
                            <input type="password" name="password" id="password" placeholder="enter password"
                                className="w-full border p-2 rounded-lg bg-gray-500"
                                value={signup.password}
                                onChange={handleSignup}
                            />
                        </div>
                        <div className="my-4">
                            <button type="submit" name="signup" id="signup"
                                className="w-full border p-2 rounded-lg bg-sky-400 text-white font-bold hover:bg-sky-500">Next</button>
                        </div>
                    </form>
                </Modal>
            )}
            {/* forgot password */}
            {triggerForgotpasswordModal && (
                <Modal setTriggerForgotpasswordModal={setTriggerForgotpasswordModal}>
                    <h2 className="my-12 text-center font-bold text-xl">Please enter our username or email</h2>
                    <form>
                        <div className="my-4">
                            <input type="text" name="usernameoremail" id="usernameoremail" placeholder="enter username or email"
                                className="w-full border p-2 rounded-lg bg-gray-500" />
                        </div>
                        <div className="my-4">
                            <button type="submit" name="forgotpassword" id="signup"
                                className="w-full border p-2 rounded-lg bg-sky-400 text-white font-bold hover:bg-sky-500">Next</button>
                        </div>
                    </form>
                </Modal>
            )}

            <div className="max-w-[1200px] m-auto flex justify-center mt-10 lg:mt-20">
                {/* left */}
                <div className="flex flex-col my-auto mx-8">
                    <h1 className="font-extrabold text-6xl">Happening now</h1>
                    <h2 className="font-bold text-4xl my-8">Join today.</h2>
                    <form onSubmit={handleLoginApi}>
                        <div className="my-4">
                            <input type="email" name="email" id="email" placeholder="enter email"
                                className="w-full border p-2 rounded-lg bg-gray-500"
                                autoComplete="email"
                                value={login.email}
                                onChange={handleLogin}
                            />
                        </div>
                        <div className="my-4">
                            <input type="password" name="password" id="password" placeholder="enter password"
                                className="w-full border p-2 rounded-lg bg-gray-500"
                                autoComplete="current-password"
                                value={login.password}
                                onChange={handleLogin}
                            />
                        </div>
                        <div className="my-4">
                            <button type="submit" name="login" id="login"
                                className="w-full border p-2 rounded-lg bg-sky-400 text-white font-bold hover:bg-sky-500">Next</button>
                        </div>
                    </form>
                    <p className="mb-8">forgot password? <span className="text-blue-500 underline cursor-pointer"
                        onClick={() => setTriggerForgotpasswordModal(true)}>click here</span></p>
                    <hr />
                    <div className="my-8">
                        <button type="submit" name="signinwithgoogle" id="signinwithgoogle"
                            className="w-full border p-2 rounded-lg font-bold flex items-center justify-center hover:bg-gray-50"><p className="pb-2">Sign in with</p> <img src="/images/google.png" alt="google" className="w-24" /></button>
                    </div>
                    <hr />
                    <div className="my-8">
                        <button type="button" name="signup" id="signup"
                            className="w-full border p-2 rounded-lg font-bold flex items-center justify-center hover:bg-gray-50 text-sky-400"
                            onClick={() => setTriggerSignupModal(true)}
                        >Sign up with us</button>
                    </div>
                </div>
                {/* right */}
                <div className="lg:flex flex-col my-auto hidden">
                    <img src="/images/landing-page.jpg" alt="landing page" srcSet="https://cdn.wallpapersafari.com/92/61/dsHqtl.jpg"
                        className="object-contain h-[700px] rounded-lg" />
                </div>
            </div>
        </main>
    )
}
