import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import RegisterForm from '../forms/RegisterForm'

const RegisterPage = (props) => {
    const renderPage = () => {
        if (props.auth === false || props.auth === null) {
            return <RegisterForm />
        } else {
            return <Redirect to="/" />
        }
    }

    return (
        <div>
            <h1>Register</h1>
            {renderPage()}
        </div>
    )
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    }
}

export default connect(mapStateToProps)(RegisterPage)