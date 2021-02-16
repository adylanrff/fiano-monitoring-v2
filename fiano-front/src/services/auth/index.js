import React, { useEffect, useState } from "react"
import { getCurrentToken, getCurrentUser, getUser, login as loginApi } from "./api";

export function useAuth() {
    const [user, setUser] = useState(getCurrentUser());
    const [token, setToken] = useState(getCurrentToken());
    const [error, setError] = useState('');

    const logout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem('jwt_token')
            localStorage.removeItem('current_user')
            setToken(null)
            setUser(null)
        }
    }

    const login = (username, password) => {
        loginApi(username, password).then((data) => {
            if (typeof window !== "undefined") {
                setToken(data.access)
                localStorage.setItem("jwt_token", data.access)
            }
        }).catch((e) => setError(e.message))
    }

    const handleSetUser = (user) => {
        setUser(user)
        localStorage.setItem("current_user", user)
    }

    useEffect(() => {
        if (!token) {
            setToken(window.localStorage.getItem('jwt_token'))
        } else {
            getUser(token).then((user) => handleSetUser({ ...user, token })).catch((e) => setError(e))
        }
    }, [token])

    return { error, user, logout, login }
}


export const authContext = React.createContext({
    user: {},
    login: () => { },
    logout: () => { }
})

const { Provider } = authContext;

export default function AuthProvider({ children }) {
    const { error, user, login, logout } = useAuth();

    return (
        <Provider value={{ user, login, logout, error }}>
            {children}
        </Provider>
    )
} 

