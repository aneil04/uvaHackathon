import React, { useRef, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { v4 as uuidv4 } from 'uuid';
import firebase from '../firebase'

export default function Signup() {
    // const ref = firebase.firestore().collection("test")
    // const docData = {
    //     name: "bob",
    //     favColor: "blue",
    //     age: 13
    // }

    // ref.add(docData).then(() => {
    //     console.log("Document successfully written!");
    // });

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const personName = useRef()
    const studentGrade = useRef()
    const mentorSubjects = useRef()
    const mentorDescription = useRef()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)

            if (mentorSubjects.current.value !== '') {
                const ref = firebase.firestore().collection("mentors")
                const docData = {
                    docID: uuidv4(),
                    name: personName.current.value,
                    description: mentorDescription.current.value,
                    subjects: mentorSubjects.current.value.split(" "),
                    hours: 0,
                    studentsTaught: 0,
                    ratings: [],
                    numRatings: [],
                    
                }
                ref.add(docData).then(() => {
                    console.log("document added to mentor db")
                })
            } else if (studentGrade.current.value !== '') {
                const ref = firebase.firestore().collection("students")
                const docData = {
                    docID: uuidv4(),
                    name: personName.current.value,
                    grade: studentGrade.current.value
                }
                ref.add(docData).then(() => {
                    console.log("document added to mentor db")
                })
            }

            history.push('/')
        } catch {
            setError('Failed to create account')
        }
        setLoading(false)
    }

    return (
        <>
            <section>
                <div>
                    <h1>Sign Up</h1>
                    {error && <div>{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Email</label>
                            <input type="email" ref={emailRef}></input>
                        </div>
                        <div>
                            <label>Name</label>
                            <input ref={personName}></input>
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" ref={passwordRef}></input>
                        </div>
                        <div>
                            <label>Password Confirm</label>
                            <input type="password" ref={passwordConfirmRef}></input>
                        </div>
                        <h2>Sign up as student:</h2>
                        <div>
                            <div>
                                <label>Grade Level</label>
                                <input type="number" ref={studentGrade}></input>
                            </div>
                        </div>
                        <h2>Sign up as mentor:</h2>
                        <div>
                            <div>
                                <h3>Subjects you teach:</h3>
                                <input ref={mentorSubjects} type="text" placeholder="math, science, etc."></input>
                            </div>
                            <div>
                                <label>Describe Yourself:</label>
                                <textarea placeholder="Provide a description of your abilities" ref={mentorDescription}></textarea>
                            </div>
                        </div>
                        <div>
                            <button disabled={loading} type="submit">Sign Up</button>
                        </div>
                    </form>
                </div>
                <div>
                    <div>Have an account?</div>
                    <Link to="/login">Log In</Link>
                </div>
            </section>
        </>
    )
}