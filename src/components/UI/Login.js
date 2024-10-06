import React, {useState, useContext, useEffect, Fragment} from 'react'

import AuthContext from '../../util/AuthContext.js'

import classes from './Login.module.css'

//login component with a simple authorization mechanism
const Login = () => {
    const { login, logout } = useContext(AuthContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')
    const [isAuth, setIsAuth] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        const isAuthenticated = login(username, password)
        
        if(!isAuthenticated){
            setErr('Invalid username or password, please try again.')
            setIsAuth(false)
        }
        else{
            setErr('')
            setIsAuth(true)
            window.location.reload();
        }       
    }

    const handleLogout = (e) => {
        e.preventDefault()
        
        setUsername('')
        setPassword('')
        setIsAuth(false)
        logout()
        window.location.reload();
        
    }

    useEffect(() => {
        if(localStorage.getItem('user')){
            setIsAuth(true)
        }
    })

    return(
        <Fragment>
            
            {isAuth === false && (
                <Fragment>
                    
                    <form className={classes.loginForm} onSubmit={handleLogin}>
                    <h3>Log in:</h3>
                        <div>
                            <label>User: </label>
                            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} required />
                        </div>
                        <div>
                            <label>Password: </label>
                            <input type="text" value={password} onChange={(event) => setPassword(event.target.value)} required />
                        </div>
                        <button type="submit">Log In</button>
                        {err && <p style={{color: 'red'}}>{err}</p>}
                        {!err && isAuth && <p style={{color: 'green'}}>Welcome!</p>}
                    </form>
                </Fragment>
            )}
            {isAuth === true && (
                <Fragment>
                    
                    <form className={classes.logoutForm} onSubmit={handleLogout}>
                        <h3>Log out:</h3>
                        <button type="submit">Log Out</button>    
                    </form>
                </Fragment>
            )}
            
            
        </Fragment>
    )
}

export default Login