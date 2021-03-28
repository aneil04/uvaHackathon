import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/firestore'
import MentorCard from './MentorCard'
import { v4 as uuidv4 } from 'uuid';

export default function Dashboard() {
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const [error, setError] = useState('')
    const [mentorData, setMentorData] = useState([])
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
    function getMentorData(subject, index) {
        const ref = firebase.firestore().collection("mentors")
        ref.where('subjects', 'array-contains', subject).get().then((querySnapshot) => {
            const items = []
            querySnapshot.forEach((doc) => {
                items.push({ ...doc.data() });
            })
            const temp = mentorData
            temp.push(items)
            setMentorData(temp)
            
            if (index < topSubjects.length - 1) {
                getMentorData(topSubjects[index + 1], index + 1)
            } else {
                setLoading(false)
            }
        })
    }

    useEffect(() => {
        getMentorData(topSubjects[0], 0)
    }, [])
    
    let index = 0;
    return (
        <>
            {!loading && mentorData.map(mentors => {
                return (
                    <div>
                        <h3>{topSubjects[index]}</h3>
                        <div>{index++}</div>
                        {/* ^^^^HIDE THAT DIV */}
                        <Subject key={uuidv4()} mentors={mentors}></Subject>
                    </div>
                )
            })}
            <button onClick={handleLogout}>Log Out</button>
        </>
    )
}

function Subject({ mentors }) {
    return (
        <div>
            {mentors && mentors.map(mentor => {
                return <MentorCard key={uuidv4()} mentorData={mentor}></MentorCard>
            })}
        </div>
    )
}