import React from 'react'
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { URL } from '../url'

export const UserContext = createContext({})


export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        try {
            const storedData = localStorage.getItem("authData")
            const token = storedData ? JSON.parse(storedData).token : null
            console.log(token);
            if (!token) {
                console.log("no token in local storage");
                return;

            }

            const res = await axios.get(URL + "/api/auth/refetch", {
                headers: { Authorization: `Bearer ${token}` },

                withCredentials: true
            });
            console.log("user data from refetch", res.data);

            setUser(res.data)
            localStorage.setItem("authData", JSON.stringify({ token, user: res.data }))
        }
        catch (err) {
            console.log(err);

        }
    }

    return (
        <div>
            <UserContext.Provider value={{ user, setUser }}>
                {children}
            </UserContext.Provider>
        </div>
    )
}
