import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import EmployeesPage from './mainPage/EmployeesPage'
import LoginPage from './authPages/LoginPage'
import RegisterPage from './authPages/RegisterPage'
import { connect } from 'react-redux'
import { signIn, signOut, fetchWorkers } from '../actions'
import Header from './Header'

class App extends React.Component {
    async componentDidMount() {
        let res = await fetch('http://localhost:4000/users/auth', { credentials: 'include' })
        res = await res.json()

        if (res.isAuth) {
            this.props.signIn()
            this.props.fetchWorkers('', 1)
        } else {
            this.props.signOut()
        }
    }

    render() {
        return (
            <div className="ui container">
                <BrowserRouter>
                    <Header />
                    <Route path="/" exact component={EmployeesPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/login" component={LoginPage} />
                </BrowserRouter>
            </div>
        )
    }
}

export default connect(null, { signIn, signOut, fetchWorkers })(App)