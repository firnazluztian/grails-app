import React, { useEffect, useState, Fragment } from 'react'
import { SERVER_URL } from '../../config'
import axios from 'axios' 
import { toastSuccess, toastDanger, toastWarning } from '../widget/toaster'
import LicenseForms from './LicenseForms'

const inputInitialState = { name: '', class: '', licenseNum: '', date: '', amount: '' }

const validateInput = (input) => {
    if (!Object.values(input).every(e => e !== '')) toastWarning('please input all the required fields')
    else if (input.licenseNum.toString().length > 8 || input.licenseNum < 0) toastWarning('license number maximum digit is 9 and cannot be negative value')
    else if (input.amount < 0) toastWarning('bid amount cannot be a negative value')
    else return true
}

const TableInput = ({ isEdit, setIsEdit, refresh, setRefresh }) => {
    const [input, setInput] = useState(inputInitialState)
    const [drivers, setDrivers] = useState({data:[]})

    const getDriver = async () => {
        await axios
        .get(SERVER_URL + 'driver')
        .then(res => setDrivers(res))
        .catch(err => { toastDanger(`${err}, please try again`); console.log('@getDriver', err) })
    }
    
    const postLicense = async () => {
        if (validateInput(input)) {
            await axios
            .post(SERVER_URL + 'license', {
                classType: input.class, licenseNum: parseInt(input.licenseNum), bid: { date: input.date, amount: parseInt(input.amount) }, driver: { id: parseInt(input.name) }
            })
            .then(() => {
                toastSuccess('succesfully saved')
                setRefresh(true)
                setInput(inputInitialState)
            })
            .catch(err => { toastDanger(`${err}, please try again`); console.log('@postLicense', err) })
        }
    }
    
    const updateLicense = async (input, selectedId) => {
        if (validateInput(input)) {
            await axios
            .patch(SERVER_URL + 'license/' + selectedId, {
                classType: input.class, licenseNum: parseInt(input.licenseNum), bid: { date: input.date, amount: parseInt(input.amount) }, driver: { id: parseInt(input.name) }
            })
            .then(res => {
                toastSuccess('succesfully edited')
                setRefresh(true)
                setInput(inputInitialState)
                setIsEdit({edit: false})
            })
            .catch(err => { toastDanger(`${err}, please try again`); console.log('@updateLicense', err) })
        }
    }

    const handleChange = (e) => setInput({...input, [e.target.name]: e.target.value})
    const handleSubmit = () => isEdit.edit ? updateLicense(input, isEdit.id) : postLicense()

    useEffect(() => { if(isEdit.edit) setInput({name: isEdit.name, class: isEdit.class, licenseNum: isEdit.licenseNum, date: isEdit.date, amount: isEdit.amount}) }, [isEdit])
    useEffect(() => { getDriver() }, [refresh])

    return <Fragment>
        <hr/>
        <h5 className='text-center'>Creating or updating a license</h5>
        <LicenseForms 
            drivers={drivers} 
            input={input} 
            setInput={setInput} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
            setIsEdit={setIsEdit} 
            isEdit={isEdit} 
            inputInitialState={inputInitialState} 
        />
    </Fragment>
}

export default TableInput

