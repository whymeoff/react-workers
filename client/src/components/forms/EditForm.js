import React from 'react'
import { Field, reduxForm } from 'redux-form'

class EditForm extends React.Component {
    componentDidMount() {
        const { fullname, gender, phoneNumber, position, salary } = this.props.pickedWorker

        this.props.initialize({ 
            fullname,
            gender,
            phoneNumber,
            position,
            salary
        })
    }

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

    renderSelect = ({ input, label, meta }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <select { ...input }>
                    <option value="">Select your gender..</option>
                    <option value="male" key={1}>Male</option>
                    <option value="female" key={2}>Female</option>
                </select>
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formValues) => {
        const { _id } = this.props.pickedWorker
        this.props.onEditSubmit(_id, formValues)
    }

    render() {
        const { handleSubmit } = this.props
        return (
            <form onSubmit={handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="fullname" component={this.renderInput} label="Enter fullname" />
                <Field name="gender" component={this.renderSelect} label="Select gender" />
                <Field name="phoneNumber" component={this.renderInput} label="Enter phone number" />
                <Field name="salary" component={this.renderInput} label="Enter salary" />
                <Field name="position" component={this.renderInput} label="Enter position" />
                <button className="ui button primary">Edit</button>
                <button className="ui button" onClick={this.props.onChangeAction}>Back to list</button>
            </form>
        )  
    }
}

const validate = (formValue) => {
    const errors = {}

    if (!formValue.fullname) {
        errors.fullname = 'You must enter a fullname'
    }

    if (!formValue.gender) {
        errors.gender = 'You must enter a gender'
    }

    if (!formValue.phoneNumber) {
        errors.phoneNumber = 'You must enter a phone number'
    }

    if (!formValue.salary) {
        errors.salary = 'You must enter a salary'
    }

    if (!formValue.position) {
        errors.position = 'You must enter a position'
    }

    return errors
}

export default reduxForm({
    form: 'editForm',
    validate
})(EditForm)