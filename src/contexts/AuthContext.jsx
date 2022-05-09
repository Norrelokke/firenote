import React, { createContext, useContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'
import { auth } from '../firebase'
import { HashLoader } from 'react-spinners'

const AuthContext = createContext()

const useAuthContext = () => {
    return useContext(AuthContext)
}

//funktionskomponent
const AuthContextProvider = ({ children }) => {
    // user state
    const [onlineUser, setOnlineUser] = useState(null)
    const [loading, setLoading] = useState(true)

    //  signup new user
    const signup = async (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // signin new user
    const signin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    // signout new user
    const signout = (email, password) => {
        return signOut(auth)
    }

    useEffect(() => {
        // set the new user to onlineUser and keep online
        onAuthStateChanged(auth, (user) => {
            setOnlineUser(user)
            setLoading(false)
        })
    }, [])

    // values to the children of context
    const contextValues = {
        signup,
        signin,
        signout,
        onlineUser,
        loading,
    }

    return (
        <AuthContext.Provider value={contextValues}>
            {loading && (<div className="d-flex justify-content-center vh-100 my-5 align-items-center"><HashLoader color={"#222"} size={40} /></div>)}
            {!loading && children}
        </AuthContext.Provider>
    )
}

export { useAuthContext, AuthContextProvider as default }