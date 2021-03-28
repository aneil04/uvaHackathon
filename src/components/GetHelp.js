import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import Container from 'react-bootstrap/Container';



export default function GetHelp() {
    // const { currentUser, logout } = useAuth()
    // var b = true;
    // console.log(currentUser)
    // if(currentUser === undefined){
    //     b = false;
    // }
    // b = false;
    // if(b === false){
    //     return (
    //         <div class= "container-fluid ">
    //             <body>
    //                 <a>log in </a>
    //                 <a href="/login" class="text-decoration-none"> here </a>
    //             </body>
    //         </div>
    //     )
    // }else{
    return (
        <div class= "container-fluid ">
            <div class="d-flex align-items-center">
            <strong>Waiting..</strong>
                <div class="spinner-border text-info m-5" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    )

}
