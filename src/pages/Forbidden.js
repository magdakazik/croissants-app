import {Fragment} from 'react'

import Login from '../components/UI/Login'
import classes from './Forbidden.module.css'

//if access to the page is forbidden (user not logged in), then show this component
const Forbidden = () => {
    return(
        <Fragment>
            <div className={classes.forbiddenWarning}>403 FORBIDDEN! Please log in to see the page.</div>
            <Login />
        </Fragment>
    )
}

export default Forbidden