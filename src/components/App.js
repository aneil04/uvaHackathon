import React, { Component } from 'react';
import { render } from 'react-dom';
import "../styles/styles.css"
import 'bootstrap/dist/css/bootstrap.min.css';


import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import firebase from '../firebase'


import Signup from './Signup'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'

export default function App() {

  function giveHelp() {
    // if (currentUser.uid !== undefined) {
    //   const ref = firebase.firestore().collection("users")
    //   ref.where("email", "==", currentUser.email).get().then((doc) => {
    //     console.log(doc.data)
    //   })
    // }
  }

  function getHelp() {

  }

  return (
    <div>
        <nav class="navbar navbar-dark bg-primary">
            <Container>
                <Button class="btn btn-info" href="/home">Home</Button>
                <Button class="btn btn-info" href="#">Give Help</Button>
                <Button class="btn btn-info" href="#">Get Help</Button>
                <Button class="btn btn-info" href="/login">Login</Button>
                <Button class="navbar-brand" href="/logout">Logout</Button>
                <Button class="navbar-brand" href="/signup">Sign up</Button>
                <Button class="navbar-brand" href="#">Edit Profile</Button>
            </Container>
            </nav>
      <AuthProvider>
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  )
}