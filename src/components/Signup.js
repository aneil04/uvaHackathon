import React, { useRef, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup, getStuff } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch {
            setError('Failed to create account')
        }
        setLoading(false)
    }

    return (
        <>
            <section id="container">
                <div className="signupCSS.card" id="signup-card">
                    <div id="signup-text">Sign Up</div>
                    {error && <div>{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div id="email" className="signupCSS.form-input-container">
                            <label className="signupCSS.label">Email</label>
                            <input type="email" ref={emailRef} className="signupCSS.form-input"></input>
                        </div>
                        <div id="password" className="signupCSS.form-input-container">
                            <label className="signupCSS.label">Password</label>
                            <input type="password" ref={passwordRef} className="signupCSS.form-input"></input>
                        </div>
                        <div id="password-confirm" className="signupCSS.form-input-container">
                            <label className="signupCSS.label">Password Confirm</label>
                            <input type="password" ref={passwordConfirmRef} className="signupCSS.form-input"></input>
                        </div>
                        <div id="signup-btn-container">
                            <button disabled={loading} type="submit" id="signup-btn">Sign Up</button>
                        </div>
                    </form>
                </div>
                <div className="signupCSS.card" id="login-card">
                    <div id="login-text">Have an account?</div>
                    <Link to="/login">Log In</Link>
                </div>
            </section>
        </>
    )
}
