import React from 'react'
import validator from 'validator'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { Link } from 'react-router-dom'

class LoginForm extends React.Component {
    renderError = ({ error, touched }) => {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    renderInput = ({ input, label, meta }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input { ...input } />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = async (formValues) => {
        const res = await fetch('http://localhost:4000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ ...formValues })
        })

        if (res.status === 401) {
            const error = { _error: 'Login failed', password: 'Invalid credentials', email: 'Invalid credentials' }

            throw new SubmissionError(error)
        } else {
            this.props.onAuthSuccess()
        }
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="email" component={this.renderInput} label="Enter email" />
                <Field name="password" component={this.renderInput} label="Enter password" />
                <button className="ui button primary">Login</button>
                <Link to="/register">To Register</Link>
            </form>
        )
    }
}

const validate = (formValues) => {
    const errors = {}

    if (formValues.email && !validator.isEmail(formValues.email)) {
        errors.email = 'You must enter valid email'
    }

    if (!formValues.email) {
        errors.email = 'You must enter email'
    }

    if (!formValues.password) {
        errors.password = 'You must enter a password'
    } 

    return errors
}

export default reduxForm({
    form: 'registerForm',
    validate
})(LoginForm)