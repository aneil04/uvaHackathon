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
import GiveHelp from './GiveHelp'
import GetHelp from './GetHelp'
import homepage from './homepage'

export default function App() {

  return (
    <div>
        <nav class="navbar navbar-dark bg-primary">
          <div class= "container-fluid ">
                <Button class="navbar-brand" href="/home">Home</Button>
                <Button class="navbar-brand" href="/givehelp">Give Help</Button>
                <Button class="navbar-brand" href="/gethelp">Get Help</Button>
                <Button class="navbar-brand" href="/login">Login</Button>
                <Button class="navbar-brand" href="/logout">Logout</Button>
                <Button class="navbar-brand" href="/signup">Sign up</Button>
            </div>
            </nav>
      <AuthProvider>
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/getHelp" component={GetHelp} />
            <Route path="/giveHelp" component={GiveHelp} />
            <Route path ="/home" component={homepage} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  )
}