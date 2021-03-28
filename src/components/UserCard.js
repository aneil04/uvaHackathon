import React from 'react'
import "../styles/styles.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';


export default function UserCard({userData}) {
    return (
        <Container>
            <div>
                <h5>{userData.name}</h5>
                <div>
                    <div>{userData.rating}/5</div>
                    <div>{userData.hours} hours taught</div>
                    <div>{userData.description}</div>
                </div>
            </div>
        </Container>
    )
}
