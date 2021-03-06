import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/firestore'
import UserCard from './UserCard'
import { v4 as uuidv4 } from 'uuid';
import "../styles/styles.css"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Dashboard() {
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const [error, setError] = useState('')
    const [userData, setUserData] = useState([])
    const topSubjects = ["math", "science", "english"]
    const [loading, setLoading] = useState(true)
    const [helpStatus, setHelpStatus] = useState()

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
        const ref = firebase.firestore().collection("newUsers")
        ref.where('subjects', 'array-contains', subject).where("status", "==", true).get().then((querySnapshot) => {
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
        const ref = firebase.firestore().collection("newUsers")
        ref.where("email", "==", currentUser.email).get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                setHelpStatus(doc.data().status)
            })
            getUserData(topSubjects[0], 0)
        })
    }, [])

    function toggleHelp() {
        const ref = firebase.firestore().collection("newUsers")
        ref.where("email", "==", currentUser.email).get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                doc.ref.update({
                    status: !helpStatus
                }).then(() => {
                    const temp = !helpStatus
                    setHelpStatus(temp)
                })
            })
        })
    }

    let index = -1;
    return (
        <>
            <div className="dashboard-container">
                <div className="head-container">
                    <h1>Dashboard</h1>
                </div>
                <button onClick={toggleHelp} className="custom-btn">{helpStatus ? "Get Help" : "Give Help"}</button>
                {!loading && userData.map(user => {
                    index++;
                    return (
                        <div className="tasks-container">
                            <div className="head-container">
                                <h3>{topSubjects[index]}</h3>
                            </div>
                            <div className="users-container">
                                {user && user.map(_user => {
                                    return <UserCard key={uuidv4()} userData={_user}></UserCard>
                                })}
                            </div>
                        </div>
                    )
                })}
                <button onClick={handleLogout} className="btn btn-danger">Log Out</button>
            </div>

        </>
    )
}