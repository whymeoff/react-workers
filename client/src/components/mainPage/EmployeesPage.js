import React from 'react'
import { connect } from 'react-redux'
import { reset } from 'redux-form'
import EmployeesList from './EmployeesList'
import { fetchWorkers } from '../../actions'
import Pages from './Pages'
import Search from '../forms/Search'
import AddForm from '../forms/AddForm'
import EditForm from '../forms/EditForm'

class EmployeesPage extends React.Component {
    state = { action: 'list' }

    componentDidMount() {
        if (this.props.auth) {
            this.props.fetchWorkers('', 1)
        }
    }

    onChangeAction = () => {
        this.props.fetchWorkers(this.props.term, this.props.page)
        this.setState({ action: 'list' })
    }

    onFetchWorkers = (term, page) => {
        this.props.fetchWorkers(term, page)
    }

    onAddWorker = (dispatch, worker) => {
        fetch('http://localhost:4000/employees', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...worker })
        })

        dispatch(reset('addForm'))
    }

    onEditWorker = (id, worker) => {
        fetch(`http://localhost:4000/employees/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json' 
            },
            credentials: 'include',
            body: JSON.stringify({ ...worker })
        })
    }

    renderPage = () => {
        const { action } = this.state
        const { auth } = this.props

        if (auth && action === 'list') {
            return (
                <div>
                    <Search fetchWorkers={this.onFetchWorkers} />
                    <button 
                        className="ui positive button fluid" 
                        style={{ marginTop: '10px' }}
                        onClick={() => this.setState({ action: 'add' })}
                    >
                        Add
                    </button>
                    <EmployeesList 
                        onChangeActionToEdit={() => this.setState({ action: 'edit' })} 
                    />
                    <Pages />
                </div>
            )
        } else if (auth && action === 'edit') {
            return (
                <EditForm 
                    pickedWorker={this.props.pickedWorker}
                    onEditSubmit={this.onEditWorker}
                    onChangeAction={this.onChangeAction}
                />
            )
        } else if (auth && action === 'add') {
            return (
                <AddForm 
                    onChangeAction={this.onChangeAction}
                    onAddSubmit={this.onAddWorker}
                />
            )
        } else {
            return (
                <div>
                    <h2>To see all data you need to authenticate!</h2>
                </div>
            )
        }
    }

    render() {
        return <div>{this.renderPage()}</div>
    }
    
}

const mapStateToProps = ({ auth, data, form }) => {
    const term = (form.searchForm && form.searchForm.values) ?
        form.searchForm.values.term : ''

    return {
        auth,
        page: data.currentPage,
        pickedWorker: data.pickedWorker,
        term
    }
}

export default connect(mapStateToProps, { fetchWorkers })(EmployeesPage)