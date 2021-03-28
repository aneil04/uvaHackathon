import React from 'react'

export default function UserCard({userData}) {
    return (
        <div>
            <h5>{userData.name}</h5>
            <div>
                <div>{userData.rating}/5</div>
                <div>{userData.hours} hours taught</div>
                <div>{userData.description}</div>
            </div>
        </div>
    )
}
