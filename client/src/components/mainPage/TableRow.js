import React from 'react'
import { connect } from 'react-redux'
import { fetchWorkers, pickWorker } from '../../actions'

class TableRow extends React.Component {
    onDelete = async () => {
        let { currentPage, term, worker, workersLength } = this.props

        await fetch(`http://localhost:4000/employees/${worker._id}`, {
            method: 'DELETE',
            credentials: 'include'
        })

        currentPage = (workersLength === 1 && currentPage !== 1) ? currentPage - 1 : currentPage

        this.props.fetchWorkers(term, currentPage)
    }

    onEdit = () => {
        this.props.pickWorker(this.props.worker)
        this.props.onChangeActionToEdit()
    }

    render() {
        return (
            <tbody>
                <tr>
                    <td>{this.props.worker.fullname}</td>
                    <td>{this.props.worker.position}</td>
                    <td>{this.props.worker.salary}</td>
                    <td>{this.props.worker.createdAt}</td>
                    <td>
                        <button onClick={this.onEdit} className="ui primary button">Edit</button>
                        <button onClick={this.onDelete} className="ui button negative">Delete</button>
                    </td>
                </tr>
            </tbody>
        )
    }
}

const mapStateToProps = ({data, form}) => {
    const term = (form.searchForm && form.searchForm.values) ?
        form.searchForm.values.term : ''

    return {
        currentPage: data.currentPage,
        workersLength: data.workers.length,
        term
    }
}

export default connect(
    mapStateToProps,
    { fetchWorkers, pickWorker }
)(TableRow)