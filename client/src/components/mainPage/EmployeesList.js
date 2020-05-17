import './EmployeesList.css'
import React from 'react'
import { connect } from 'react-redux'
import { fetchWorkers } from '../../actions'
import TableRow from './TableRow'

class EmployeesList extends React.Component {
    renderList() {
        const table = []
        const { workers } = this.props.data

        table.push(
            <thead key={0}>
                <tr>
                    <td>Fullname</td>
                    <td>Position</td>
                    <td>Salary</td>
                    <td>Creation Date</td>
                    <td>Action</td>
                </tr>
            </thead>   
        )
        for (let i = 0; i < workers.length; i++) {
            table.push(
                <TableRow 
                    key={i+1} 
                    worker={workers[i]} 
                    onChangeActionToEdit={this.props.onChangeActionToEdit} 
                />
            )
        }
        return table
    }

    render() {
        return <table>{this.renderList()}</table>
    }
}

const mapStateToProps = ({data}) => {
    return {
        data
    }
}

export default connect(mapStateToProps, { fetchWorkers })(EmployeesList)