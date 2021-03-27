import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import CreateTask from './CreateTask'
import firebase from 'firebase/app'
import 'firebase/firestore'
import Task from './Task'

//TODO: when a task is finished, it shouldn't be deleted. filter by finished tasks to display on the front page

export default function Dashboard() {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const [newTaskEnabled, setNewTaskEnabled] = useState(false)
    const [tasks, setTasks] = useState([])

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

    function getTasks() {
        let tasksRef = firebase.firestore().collection("/tasks");
        tasksRef.where("finished", "==", false).get().then(querySnapshot => {
            const tempDoc = []
            querySnapshot.forEach((doc) => {
                tempDoc.push({ ...doc.data() })
            });
            setTasks(tempDoc)
        })
    }

    useEffect(() => {
        getTasks()
        validateUserInfo()
    }, [newTaskEnabled]);

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

    function createNewTask() {
        setNewTaskEnabled(true)
    }

    function handleMyTask() {
        try {
            history.push(`/my-tasks/${currentUser.uid}`)
        } catch {
            alert('uhhh')
        }
    }

    return (
        <>
            <section className="section">
                <div className="dashboardNav">
                    <Link to="/update-profile" className="dashboardNavLink">Update Profile</Link>
                    <div onClick={handleMyTask} className="dashboardNavLink">My Tasks</div>
                    <div onClick={handleLogout} className="dashboardNavLink">Log Out</div>
                </div>
                <div className="dashboardSectionHead">
                    <h1 className="h1">Dashboard</h1>
                    {error && <div>{error}</div>}
                    {/* <div>Email: {currentUser.email}</div> */}
                </div>
                <div className="taskContainer">
                    {tasks.map(task => {
                        return <Task key={task.docID} getTasks={getTasks} task={task} />
                    })}
                </div>  
            </section>
            {newTaskEnabled && <CreateTask setNewTaskEnabled={setNewTaskEnabled} currentUser={currentUser} />}
            <button className="createNewTaskBtn" onClick={createNewTask}>Create a Task</button>
        </>
    )
}