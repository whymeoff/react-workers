import React from 'react'
import { connect } from 'react-redux'
import { fetchWorkers } from '../../actions'

const Pages = (props) => {
    const onNextClick = () => {
        const page = props.currentPage + 1
        props.fetchWorkers(props.term, page)
    }

    const onPreviousClick = () => {
        const page = props.currentPage - 1
        props.fetchWorkers(props.term, page)
    }

    const renderPages = () => {
        console.log(props.pages, props.currentPage)
        if (props.pages === 1 || props.pages === 0) {
            return <div></div>
        } else if (props.currentPage === props.pages) {
            return <button onClick={onPreviousClick} className="ui button left floated positive">Previous</button>
        } else if (props.currentPage === 1) {
            return <button onClick={onNextClick} className="ui button right floated positive">Next</button>
        } else {
            return (
                <div>
                    <button onClick={onPreviousClick} className="ui button left floated positive">Previous</button>
                    <button onClick={onNextClick} className="ui button right floated positive">Next</button>
                </div>
            )
        }
    }

    return (
        <div style={{ marginTop: '10px' }}>{renderPages()}</div>
    )
}

const mapStateToProps = ({data, form}) => {
    const term = (form.searchForm && form.searchForm.values) ?
        form.searchForm.values.term : ''

    return {
        pages: data.pages,
        currentPage: data.currentPage,
        term
    }
}

export default connect(mapStateToProps, { fetchWorkers })(Pages)