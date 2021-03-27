import React, { useContext, useEffect, useState } from 'react'
import { auth, database } from '../firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function getStuff() {
        database.collection('test').doc('object1').get().then(doc => {
            console.log(doc)
        })
    }

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        getStuff
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
