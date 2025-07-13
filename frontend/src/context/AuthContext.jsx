import { createContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode'
import axios from "axios";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState()
    const [user, setUser] = useState()
    const [search,setSearch] = useState('')

    useEffect(() => {
        const retreiveToken = localStorage.getItem('token')
        if (retreiveToken) {
            setToken(retreiveToken)
        }
    }, [token])

    const login = (newToken) => {
        localStorage.setItem('token', newToken)
        setToken(newToken)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
    }


    useEffect(() => {
        try {
            const fetchUser = async () => {
                const token = localStorage.getItem('token')
                if (!token) return

                const decoded = jwtDecode(token)
                const userId = decoded.userId
                // console.log(userId)

                localStorage.setItem('userId',JSON.stringify(userId))

               const res =  await axios.get(`https://job-portal-backend-tti1.onrender.com/api/user/getUserById/${userId}`)
            //    console.log(res)
               setUser(res.data.user)
            }
            fetchUser()
        } catch (error) {
            console.log(error)
        }
    },[token])



    return (
        <AuthContext.Provider value={{ login, token, logout,user,setUser,search,setSearch }}>
            {children}
        </AuthContext.Provider>
    )
}