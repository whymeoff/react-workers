import React from 'react'
import { Field, reduxForm } from 'redux-form'

class Search extends React.PureComponent {
    renderField = ({ input, label }) => {
        return (
            <div className="item">
                <label>{label}</label>
                <input {...input}></input>
            </div>
        )
    }

    render() {
        return (
            <form onSubmit={(e) => e.preventDefault()} className="ui form">
                <Field 
                    onChange={(e) => this.props.fetchWorkers(e.target.value, 1)} 
                    name="term" 
                    component={this.renderField} 
                    label="Search" 
                />
            </form>
        )
    }
}

export default reduxForm({
    form: 'searchForm'
})(Search)