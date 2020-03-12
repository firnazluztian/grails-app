import React, { useState } from 'react'
import TableInput from './TableInput'
import TableList from './TableList'

const MainPage = () => {
    const [isEdit, setIsEdit] = useState({ 
        edit: false, id: '', name: '', class: '', licenseNum: '', date: '', amount: ''
    })
    return <div className='container'>
        <TableInput isEdit={isEdit} setIsEdit={setIsEdit} />
        <TableList isEdit={isEdit} setIsEdit={setIsEdit} /> 
    </div>
}

export default MainPage