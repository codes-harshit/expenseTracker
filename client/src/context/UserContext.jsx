import { createContext, useState } from "react";


const userContext = createContext({
    user: null,
    setUser: () => {},
    login: () => {},
    signup: () => {},
    logout: () => {},
    checkAuth: () => {},
});

export const UserContextPpovider = ({children} ) => {
    const [user, setUser] = useState();

    const login = async (email, password) => {

    }

    const signup = async (email, password, fullName, profilePic) => {

    }

    const logout = async () => {}

    const checkAuth = async () => {

    }
    return (
        <userContext.Provider value={user}>
            {children}
        </userContext.Provider>
    )
}