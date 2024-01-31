import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    let user: string = ''
    if (localStorage.getItem('loggedIn')) {
        const { username } = JSON.parse(localStorage.getItem('loggedIn')!);
        user = username;
    }
    return (
        user ? <Outlet /> : <Navigate to="/auth" />
    )
}

export { PrivateRoutes }