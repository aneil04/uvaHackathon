import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/firestore'
import UserCard from './UserCard'
import { v4 as uuidv4 } from 'uuid';
import "../styles/styles.css"
import 'bootstrap/dist/css/bootstrap.min.css';


import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


export default function Dashboard() {
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const [error, setError] = useState('')
    const [userData, setUserData] = useState([])
    const topSubjects = ["math", "science", "english"]
    const [loading, setLoading] = useState(true)

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

    //only for one subject
    function getUserData(subject, index) {
        const ref = firebase.firestore().collection("users")
        ref.where('subjects', 'array-contains', subject).get().then((querySnapshot) => {
            const items = []
            querySnapshot.forEach((doc) => {
                items.push({ ...doc.data() });
            })
            const temp = userData
            temp.push(items)
            setUserData(temp)

            if (index < topSubjects.length - 1) {
                getUserData(topSubjects[index + 1], index + 1)
            } else {
                setLoading(false)
            }
        })
    }

    useEffect(() => {
        getUserData(topSubjects[0], 0)
    }, [])

    let index = 0;
    return (
        <>

            {!loading && userData.map(user => {
                return (
                    <div>
                        <h3>{topSubjects[index]}</h3>
                        <div>{index++}</div>
                        {/* ^^^^HIDE THAT */}
                        <Subject key={uuidv4()} users={user}></Subject>
                    </div>
                )
            })}
            <button onClick={handleLogout} class="btn btn-danger">Log Out</button>
        </>
    )
}

function Subject({ users }) {
    return (
        <div>
            {users && users.map(user => {
                return <UserCard key={uuidv4()} userData={user}></UserCard>
            })}
        </div>
    )
}