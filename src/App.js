import React, {Fragment} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import { AuthProvider } from './util/AuthContext'

import Forbidden from './pages/Forbidden'
import Home from './pages/Home'


const App = () => {

  const isLogged = localStorage.getItem('user')

  return(
    <AuthProvider>
      <Fragment>
        <BrowserRouter>
          <Routes>
            {isLogged && <Route exact path='/' element={<Home />}/>}
            {!isLogged && <Route exact path='/' element={<Forbidden />}/>}
          </Routes>
        </BrowserRouter>
      </Fragment>
    </AuthProvider>
  )
}

export default App;