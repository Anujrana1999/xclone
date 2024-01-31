// not in use

import { createContext, useContext, useState } from "react";


const UserContext = createContext({});

export function LoggedIn() {
    return useContext(UserContext);
}

export const UserContextProvider = ({ children }: any) => {
    const [user, setUser] = useState(null);
    const value = {
        user,
        setUser
    };
    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}
