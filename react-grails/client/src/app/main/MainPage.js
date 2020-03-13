import React, { useState } from 'react'
import TableInput from './TableInput'
import TableList from './TableList'
import logo from '../../images/react_logo.svg'

const GrailsLogoHeader = () => {
    return <div className="App mb-2">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>React-Grails app</p>
        </header>
  </div>
}

const MainPage = () => {
    const [isEdit, setIsEdit] = useState({ edit: false, id: '', name: '', class: '', licenseNum: '', date: '', amount: ''})
    const [refresh, setRefresh] = useState(false)

    return <div className='container-fluid'>
        <GrailsLogoHeader />
        <div className='container'>
            <TableInput 
                isEdit={isEdit} 
                setIsEdit={setIsEdit} 
                refresh={refresh} 
                setRefresh={setRefresh} 
            />
            <TableList 
                isEdit={isEdit} 
                setIsEdit={setIsEdit} 
                refresh={refresh} 
                setRefresh={setRefresh} 
            /> 
        </div>
    </div>
}

export default MainPage