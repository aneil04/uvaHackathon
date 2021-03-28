import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default function Dashboard() {
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const [error, setError] = useState('')

    async function handleLogout() {
        setError('')

        try {
            logout()
            history.push('/login')
        } catch {
            setError('Failed to log out')
            alert('uhhhh')
        }
    }
    
    return (
        <>
            <button onClick={handleLogout}>Log Out</button>
        </>
    )
}