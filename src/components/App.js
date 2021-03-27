import React from 'react'
import Signup from './Signup'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile'
import MyTasks from './MyTasks'
import '../styles/Main.css'
import '../styles/Dashboard.css'
import '../styles/Navbar.css'
import '../styles/Task.css'

export default function App() {
  return (
    <div>
      <div className="navbar">

      </div>
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