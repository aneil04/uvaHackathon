import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default function Dashboard() {
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const [error, setError] = useState('')

    function validateUserInfo() {
        let userInfoRef = firebase.firestore().collection("/userInformation")
        userInfoRef.doc(currentUser.uid).get().then((doc) => {
            if (!doc.exists) {
                userInfoRef.doc(currentUser.uid).set({
                    balance: 0
                }).then(() => {
                }).catch((error) => {
                    console.log(error)
                })
            }
        })
    }
    // function getTasks() {
    //     let tasksRef = firebase.firestore().collection("/tasks");
    //     tasksRef.where("finished", "==", false).get().then(querySnapshot => {
    //         const tempDoc = []
    //         querySnapshot.forEach((doc) => {
    //             tempDoc.push({ ...doc.data() })
    //         });
    //         setTasks(tempDoc)
    //     })
    // }

    useEffect(() => {
        // getTasks()
        validateUserInfo()
    }, []);

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

    // function createNewTask() {
    //     setNewTaskEnabled(true)
    // }

    // function handleMyTask() {
    //     try {
    //         history.push(`/my-tasks/${currentUser.uid}`)
    //     } catch {
    //         alert('uhhh')
    //     }
    // }

    return (
        <>
            <button onClick={handleLogout}>Log Out</button>
        </>
    )
}