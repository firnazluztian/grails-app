import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../../config'
import axios from 'axios' 

const inputInitialState = { name: '', class: '', licenseNum: '', date: '', amount: '' }

const TableInput = ({ isEdit, setIsEdit }) => {
    const [input, setInput] = useState(inputInitialState)
    const [drivers, setDrivers] = useState({data:[]})

    // DEBUG
    useEffect(() => {
        console.log(isEdit)
    }, [isEdit])

    const getDriver = async () => {
        await axios
        .get(SERVER_URL + 'driver').then(res => setDrivers(res)).catch(err => console.log('@getDriver', err))
    }
    
    const postLicense = async () => {
        await axios
        .post(SERVER_URL + 'license', {
            classType: input.class, licenseNum: parseInt(input.licenseNum), bid: { date: input.date, amount: parseInt(input.amount) }, driver: { id: parseInt(input.name) }
        })
        .then(res => {
            alert('succesfully saved')
            setInput(inputInitialState)
        })
        .catch(err => console.log('@postLicense', err))
    }
    
    const updateLicense = async (input, selectedId) => {
        await axios
        .patch(SERVER_URL + 'license/' + selectedId, {
            classType: input.class, licenseNum: parseInt(input.licenseNum), bid: { date: input.date, amount: parseInt(input.amount) }, driver: { id: parseInt(input.name) }
        })
        .then(res => {
            alert('succesfully edited')
            console.log(res)
            setInput(inputInitialState)
            setIsEdit({edit: false})
        })
        .catch(err => console.log('@updateLicense', err))
    }

    useEffect(() => {
        if(isEdit.edit) setInput({name: isEdit.name, class: isEdit.class, licenseNum: isEdit.licenseNum, date: isEdit.date, amount: isEdit.amount})
    }, [isEdit])

    useEffect(() => { getDriver() }, [])

    const handleChange = (e) => setInput({...input, [e.target.name]: e.target.value})
    const handleSubmit = () => {
        if(!isEdit.edit) { 
            postLicense(); console.log(input)
        }
        else updateLicense(input, isEdit.id)
    }

    return <div className='row mb-2'>
        
        <div className='col input-grup'>
            <select id="inputState" className="form-control" name='name' value={input.name} onChange={handleChange}>
                <option value="" selected disabled hidden>Choose driver</option>
                {drivers.data.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
            </select>
        </div>

        <div className='col input-grup'>
            <select id="inputState" className="form-control" name='class' value={input.class} onChange={handleChange}>
                <option value="" selected disabled hidden>Choose class</option>
                {['CLASS_A', 'CLASS_B', 'CLASS_C'].map((item, index) => <option key={index} value={item}>{item}</option>)}
            </select>
        </div>
        
        <div className='col input-grup'>
            <input className='form-control' type='number' placeholder='License number' name='licenseNum' value={input.licenseNum} onChange={handleChange} />
        </div>

        <div className='col input-grup'>
            <input className='form-control' type='date' placeholder='License number' name='date' value={input.date} onChange={handleChange} />
        </div>

        <div className='col input-grup'>
            <input className='form-control' type='number' placeholder='Bid amount' name='amount' value={input.amount} onChange={handleChange} />
        </div>

        {!isEdit.edit && 
        <div className='col input-grup'>
            <button className='btn btn-success mr-1' onClick={handleSubmit}>Add</button>
        </div>}

        {isEdit.edit && 
        <div className='col input-grup'>
            <button className='btn btn-primary mr-1' onClick={handleSubmit}>Edit</button>
            <button className='btn btn-success mr-1' onClick={() => { setIsEdit({edit: false}); setInput(inputInitialState)}}
            >Cancel</button>
        </div>
        }

    </div>
}

export default TableInput

