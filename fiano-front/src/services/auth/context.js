import React from 'react'
import { useAuth } from '.';

export const authContext = React.createContext({
    user: {},
    setAuth: () => { },
    setAuthStatus: () => { }
})

const { Provider } = authContext;

export default function AuthProvider({ children }) {
    const { user, setUser, setUnauthStatus } = useAuth();

    return (
        <Provider value={{ user, setUser }}>
            {children}
        </Provider>
    )
} 
