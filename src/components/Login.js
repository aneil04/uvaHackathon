import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import "../styles/styles.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch {
            setError('Failed to create account')
        }
        setLoading(false)
    }

    return (

        <div class="container-fluid">
                <div>
                    <h1>Log In to the App</h1>
                    {error && <div>{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <label className="label">Email:</label>
                            <input type="email" ref={emailRef} className="form-input"></input>
                        </div>
                        <div className="input-container">
                            <label className="label">Password:</label>
                            <input type="password" ref={passwordRef} className="form-input"></input>
                        </div>
                        <Button disabled={loading} type="submit" className="btn btn-success">Sign In</Button>
                    </form>
                    <div id="forgot-pass-txt">
                        <Link to="/forgot-password">Forgot password?</Link>
                    </div>
                </div>
                <div id="signup_text">
                    Need an account?
                    <a class="btn btn-info" href="/signup" role="button">Sign Up</a>
                </div>
            </div>
    )
}
