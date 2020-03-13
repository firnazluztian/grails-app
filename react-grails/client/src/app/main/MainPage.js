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
    // handle post or patch request depending on the state of boolean isEdit.edit
    const [isEdit, setIsEdit] = useState({ edit: false, id: '', name: '', class: '', licenseNum: '', date: '', amount: ''})

    // handle re-rendering the app when a request has been succesfully executed
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