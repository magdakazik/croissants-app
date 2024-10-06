import React, {useState, useEffect, createContext} from 'react'

const AuthContext = createContext()

//for authentication
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    useEffect(()=> {
        const currentUser = localStorage.getItem('user')

        if(currentUser){
            setUser(JSON.parse(currentUser))
        }
    }, [])

    const login = (username, password) => {
        if(username === 'admin' && password === 'admin'){
            const user = username
            localStorage.setItem('user', JSON.stringify(user))
            setUser(user)
            return true
        }
        else{
            return false
        }
    }

    const logout = () => {
        localStorage.removeItem('user')
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext