import React from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


export default function homepage() {
    return (
        <div class= "container-fluid ">
            <a href="/givehelp" class="btn btn-dark btn-lg btn-block">Give Help</a>
            <a href="/gethelp" class="btn btn-info btn-lg btn-block">Get Help</a>
        </div>
    )
}
