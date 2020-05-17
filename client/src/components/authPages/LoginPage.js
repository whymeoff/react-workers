import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginForm from '../forms/LoginForm'
import { signIn } from '../../actions'

const LoginPage = (props) => {
    const onAuthSuccess = () => {
        props.signIn()
    }

    const renderPage = () => {
        if (props.auth === false || props.auth === null) {
            return <LoginForm onAuthSuccess={onAuthSuccess} />
        } else {
            return <Redirect to="/" /> 
        }
    }

    return (
        <div>
            <h1>Login</h1>
            {renderPage()}
        </div>
    )
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    }
}

export default connect(mapStateToProps, { signIn })(LoginPage)