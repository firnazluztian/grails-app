import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../../config'
import axios from 'axios' 
import { toastSuccess, toastDanger, toastWarning } from '../widget/toaster'

const classTypes = ['CLASS_A', 'CLASS_B', 'CLASS_C']
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

    return <div className='row mb-2 p-1'>
        
        <div className='col-sm input-group'>
            <select id="inputState" className="form-control" name='name' value={input.name} onChange={handleChange}>
                <option value='' disabled hidden>Choose driver</option>
                {drivers.data.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
            </select>
        </div>

        <div className='col-sm input-group'>
            <select id="inputState" className="form-control" name='class' value={input.class} onChange={handleChange}>
                <option value='' disabled hidden>Choose class</option>
                {classTypes.map((item, index) => <option key={index} value={item}>{item}</option>)}
            </select>
        </div>
        
        <div className='col-sm input-group'>
            <input className='form-control' type='number' placeholder='License number' name='licenseNum' value={input.licenseNum} onChange={handleChange} />
        </div>

        <div className='col-sm input-group'>
            <input className='form-control' type='date' placeholder='License number' name='date' value={input.date} onChange={handleChange} />
        </div>

        <div className='col-sm input-group'>
            <input className='form-control' type='number' placeholder='Bid amount' name='amount' value={input.amount} onChange={handleChange} />
        </div>

        {!isEdit.edit && 
        <div className='col-sm input-group'>
            <button className='btn btn-success mr-1' onClick={handleSubmit}>Add</button>
        </div>}

        {isEdit.edit && 
        <div className='col-sm input-group'>
            <button className='btn btn-primary mr-1' onClick={handleSubmit}>Edit</button>
            <button className='btn btn-success mr-1' onClick={() => { setIsEdit({edit: false}); setInput(inputInitialState)}}
            >Cancel</button>
        </div>
        }

    </div>
}

export default TableInput

