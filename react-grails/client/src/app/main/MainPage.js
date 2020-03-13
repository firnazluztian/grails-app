import React, { useState } from 'react'
import TableInput from './TableInput'
import TableList from './TableList'

const MainPage = () => {
    const [isEdit, setIsEdit] = useState({ edit: false, id: '', name: '', class: '', licenseNum: '', date: '', amount: ''})
    const [refresh, setRefresh] = useState(false)

    return <div className='container'>
        <TableInput isEdit={isEdit} setIsEdit={setIsEdit} refresh={refresh} setRefresh={setRefresh} />
        <TableList isEdit={isEdit} setIsEdit={setIsEdit} refresh={refresh} setRefresh={setRefresh} /> 
    </div>
}

export default MainPage