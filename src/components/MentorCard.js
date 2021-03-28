import React from 'react'

export default function MentorCard({mentorData}) {
    return (
        <div>
            <h5>{mentorData.name}</h5>
            <div>
                <div>{mentorData.ratings[0]}/5</div>
                <div>{mentorData.hours} hours taught</div>
                <div>{mentorData.description}</div>
            </div>
        </div>
    )
}
