import React from 'react'
import "../styles/styles.css"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UserCard({ userData }) {
    return (
        <div className="user-container">
            <h5>{userData.name}</h5>
            <div>
                <div>{userData.rating}/5 rating</div>
                <div>{userData.hours} hours taught</div>
                <div>{userData.description}</div>
            </div>
            <a target="book-meeting" href="https://meet.google.com/kxy-dcyu-wty">Book</a>
        </div>
    )
}
