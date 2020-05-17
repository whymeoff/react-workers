import React from 'react'
import validator from 'validator'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { Link } from 'react-router-dom'

class RegisterForm extends React.Component {
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
        let res = await fetch('http://localhost:4000/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...formValues })
        })
        res = await res.json()
        
        if (res.err && res.err.code === 11000) {
            const key = Object.keys(res.err.keyValue)[0]
            const error = {_error: 'Register failed' }

            error[key] = `This ${key} is already in use`

            throw new SubmissionError(error)
        }
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="username" component={this.renderInput} label="Enter username" />
                <Field name="email" component={this.renderInput} label="Enter email" />
                <Field name="password" component={this.renderInput} label="Enter password" />
                <button className="ui button primary">Register</button>
                <Link to="/login">To Login</Link>
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

    if (!formValues.username) {
        errors.username = 'You must enter username'
    }

    if (!formValues.password) {
        errors.password = 'You must enter a password'
    } 

    if (formValues.password && formValues.password.length < 7) {
        errors.password = 'Min passowrd length is 7 digits'
    }

    return errors
}

export default reduxForm({
    form: 'registerForm',
    validate
})(RegisterForm)