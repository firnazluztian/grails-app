import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../../config'
import axios from 'axios' 

const inputInitialState = {
    driver: '', make: '', model: '', name: ''
}

const TableInput = ({ isEdit, setIsEdit }) => {
    const [input, setInput] = useState(inputInitialState)
    const [makes, setMakes] = useState({data:[]})
    const [models, setModels] = useState({data:[]})
    const [drivers, setDrivers] = useState({data:[]})

    const getMake = async () => {
        await axios
        .get(SERVER_URL + 'make').then(res => setMakes(res)).catch(err => console.log('@getMake', err))
    }
    
    const getModel = async () => {
        await axios
        .get(SERVER_URL + 'model').then(res => setModels(res)).catch(err => console.log('@getModel', err))
    }
    
    const getDriver = async () => {
        await axios
        .get(SERVER_URL + 'driver').then(res => setDrivers(res)).catch(err => console.log('@getDriver', err))
    }
    
    const postData = async (state) => {
        await axios
        .post(SERVER_URL + 'vehicle', {
            name: state.name,
            make: {id: state.make},
            model: {id: state.model},
            driver: {id: state.driver}
        })
        .then(res => {
            alert('succesfully saved')
            setInput(inputInitialState)
        })
        .catch(err => console.log('@postData', err))
    }
    
    const updateData = async (state, selectedId) => {
        await axios
        .patch(SERVER_URL + 'vehicle/' + selectedId, {
            name: state.name,
            make: {id: state.make},
            model: {id: state.model},
            driver: {id: state.driver}
        })
        .then(res => {
            alert('succesfully edited')
            setInput(inputInitialState)
            setIsEdit({edit: false})
        })
        .catch(err => console.log('@updateData', err))
    }

    useEffect(() => {
        if(isEdit.edit) setInput({driver: isEdit.driver, make: isEdit.make, model: isEdit.model, name: isEdit.name})
    }, [isEdit])

    useEffect(() => { getMake() }, [])
    useEffect(() => { getModel() }, [])
    useEffect(() => { getDriver() }, [])

    const handleChange = (e) => setInput({...input, [e.target.name]: e.target.value})
    const handleSubmit = () => {
        if(!isEdit.edit) postData(input)
        else updateData(input, isEdit.id)
    }

    return <div className='row mb-2'>
        
        <div className='col input-grup'>
            <input className='form-control' type='text' placeholder='Name' name='name' value={input.name} onChange={handleChange} />
        </div>
        
        <div className='col input-grup'>
            <select id="inputState" className="form-control" name='make' value={input.make} onChange={handleChange}>
                <option value="" selected disabled hidden>Choose make</option>
                {makes.data.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
            </select>
        </div>
        
        <div className='col input-grup'>
            <select id="inputState" className="form-control" name='model' value={input.model} onChange={handleChange}>
            <option value="" selected disabled hidden>Choose model</option>
                {models.data.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
            </select>
        </div>

        <div className='col input-grup'>
            <select id="inputState" className="form-control" name='driver' value={input.driver} onChange={handleChange}>
            <option value="" selected disabled hidden>Choose driver</option>
                {drivers.data.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
            </select>
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