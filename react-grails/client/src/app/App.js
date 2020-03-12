import React from 'react';
import '../css/App.css';
import logo from '../logo.svg';
import MainPage from './main/MainPage';

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
