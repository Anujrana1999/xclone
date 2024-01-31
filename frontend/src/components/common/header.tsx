import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Header({ userData }: any) {
    const router = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;
    const logout = async () => {
        const response = await fetch(`${apiUrl}/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        if (response.ok) {
            localStorage.removeItem('loggedIn')
            router('/auth')
            toast.error('Login successful');

        }
    }

    return (
        <header className='bg-sky-400'>
            <div><Toaster /></div>
            <div className="p-4 max-w-[1200px] m-auto flex justify-between items-center">
                <h1 className="text-gray-900 font-bold text-2xl">XClone</h1>
                <div className="flex gap-2 w-1/2 justify-end">
                    <input type="text" name="search" id="search" placeholder="search username"
                        className="rounded-lg p-2 w-2/3" />
                    <button className="p-2 rounded-xl text-white bg-red-500" onClick={logout}>{userData.username} - logout</button>
                </div>
            </div>
        </header>
    )
}
