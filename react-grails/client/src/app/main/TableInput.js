import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../../config'
import axios from 'axios'

const TableInput = () => {
    const [input, setInput] = useState({
        driver: "",
        make: "",
        model: "",
        name: ""
    })
    const [makes, setMakes] = useState({data:[]})
    const [models, setModels] = useState({data:[]})
    const [drivers, setDrivers] = useState({data:[]})

    const getMake = async () => {
        await axios.get(SERVER_URL + 'make').then(res => setMakes(res)).catch(err => console.log('@getMake', err))
    }
    const getModel = async () => {
        await axios.get(SERVER_URL + 'model').then(res => setModels(res)).catch(err => console.log('@getModel', err))
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
        .then(res => console.log('succesfully post', res))
        .catch(err => console.log('@postData', err))
    }

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
        console.log(input)
    }
    const handleSubmit = () => {
        postData(input)
    }

    useEffect(() => { console.log(input) }, [input])

    useEffect(() => { getMake() }, [makes])
    useEffect(() => { getModel() }, [models])
    useEffect(() => { getDriver() }, [drivers])

    return <div className='row mb-2'>
        <div className='col input-grup'>
            <input className='form-control' type='text' placeholder='Name' name='name' value={input.name} onChange={handleChange} />
        </div>
        
        <div className='col input-grup'>
            <select id="inputState" class="form-control" name='make' value={input.make} onChange={handleChange}>
                {makes.data.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
            </select>
        </div>
        
        <div className='col input-grup'>
            <select id="inputState" class="form-control" name='model' value={input.model} onChange={handleChange}>
                {models.data.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
            </select>
        </div>

        <div className='col input-grup'>
            <select id="inputState" class="form-control" name='driver' value={input.driver} onChange={handleChange}>
                {drivers.data.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
            </select>
        </div>

        <div className='col input-grup'>
            <button className='btn btn-primary mr-1' onClick={handleSubmit}>add</button>
        </div>
    </div>
}

export default TableInput