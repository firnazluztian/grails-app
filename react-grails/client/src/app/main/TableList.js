import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../../config'
import axios from 'axios'

const tableHeader = ['#', 'Name', 'Make', 'Model', 'Driver', 'Action']
const TableList = () => {
    const [vehicles, setVehicles] = useState({data:[]})
    
    const getVehicle = async () => {
        await axios.get(SERVER_URL + 'vehicle').then(res => setVehicles(res)).catch(err => console.log('@getVehicle', err))
    }
    
    useEffect(() => { getVehicle() }, [vehicles])

    const deleteData = async (id) => {
        await axios.delete(SERVER_URL + 'vehicle/' + id)
        .then(res => console.log('successfully deleted'))
        .catch(err => console.log('@deleteData', err))
    } 

    return <table className='table table-hover text-center table-dark'>
        <thead>
            <tr>
                {tableHeader.map((item, index) => <th key={index}>{item}</th>)}
            </tr>
        </thead>
        <tbody>
        {vehicles.data.map((item, index) => {
            return <tr key={index}>
                <th>{item.id}</th>
                <td>{item.name}</td>
                <td>{item.make.name}</td>
                <td>{item.model.name}</td>
                <td>{item.driver.name}</td>
                <td>
                    <button className='btn btn-primary mr-1'>edit</button>
                    <button className='btn btn-danger' onClick={() => deleteData(item.id)}>delete</button>
                </td>
            </tr>
        })}
        </tbody>
    </table>
}

export default TableList