import React, {Fragment, useState, useEffect} from 'react'
import '../css/App.css'
import grailsLogo from '../images/grails-cupsonly-logo-white.svg';
import reactLogo from '../images/logo.svg';
import {CLIENT_VERSION, REACT_VERSION, SERVER_URL} from '../config';
import MainPage from './main/MainPage';
import logo from '../logo.svg';

const GrailsLogoHeader = () => {
    return <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>React-Grails app</p>
        </header>
  </div>
}

const App = () => {
    return <div className='container-fluid'>
        <GrailsLogoHeader />
        <MainPage />
    </div>

}

export default App;
