import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../actions'

const Header = (props) => {
    const onClickLogout = async () => {
        await fetch('http://localhost:4000/users/logout', {
            method: 'POST',
            credentials: 'include'
        })
        props.signOut()
    }

    const renderButton = () => {
        if (props.auth === null) {
            return <div></div>
        } else if (props.auth) {
            return <button className="negative ui button" onClick={onClickLogout}>Logout</button>
        } else {
            return <Link className="positive ui button" to="/login">Login</Link>
        }
    }   

    return (
        <div className="ui secondary pointing menu">
             <Link to="/" className="item">Workers</Link>
             <div className="right menu">
                {renderButton()}
            </div>
        </div>
    )
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    }
}

export default connect(mapStateToProps, { signOut })(Header)