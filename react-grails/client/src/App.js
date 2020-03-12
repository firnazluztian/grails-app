import React, {Fragment, useState, useEffect} from 'react'
import grailsLogo from './images/grails-cupsonly-logo-white.svg';
import reactLogo from './images/logo.svg';
import {CLIENT_VERSION, REACT_VERSION, SERVER_URL} from './config';
import 'whatwg-fetch';
import axios from 'axios'

const GrailsLogoHeader = () => {
    return <div className="grails-logo-container" key={1}>
        <img className="grails-logo" src={grailsLogo} alt="Grails"/>
        <span className="plus-logo">+</span>
        <img className="hero-logo" src={reactLogo} alt="React"/>
    </div>
}

const App = () => {
    return <div className='container-fluid'>
        <GrailsLogoHeader />
        
        <div className='container'>
            <h1 className='text-center'>babi</h1>
        </div>
    </div>

}

export default App;
