import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../../config'
import axios from 'axios'

const tableHeader = ['#', 'Name', 'Class', 'License Number', 'Bid Date', 'Bid Amount', 'Action']

const TableList = ({ isEdit, setIsEdit }) => {
    const [licenses, setLicenses] = useState({data:[]})
    
    const getLicense = async () => {
        await axios.get(SERVER_URL + 'license').then(res => setLicenses(res)).catch(err => console.log('@getLicense', err))
    }
    
    useEffect(() => { getLicense() }, [])

    const deleteLicense = async (id) => {
        await axios.delete(SERVER_URL + 'license/' + id)
        .then(alert('succesfully deleted'))
        .catch(err => console.log('@deleteLicense', err))
    } 

    return <table className='table table-hover text-center table-dark'>
        <thead>
            <tr>{tableHeader.map((item, index) => <th key={index}>{item}</th>)}</tr>
        </thead>
        <tbody>
        {licenses.data.map((item, index) => {
            return <tr key={index}>
                <th>{item.id}</th>
                <td>{item.driver.name}</td>
                <td>{item.classType}</td>
                <td>{item.licenseNum}</td>
                <td>{item.bid.date}</td>
                <td>${item.bid.amount}</td>
                <td>
                    <button 
                        className='btn btn-primary mr-1' 
                        onClick={() => setIsEdit({ edit: true, id: item.id, name: item.driver.id, class: item.classType, licenseNum: item.licenseNum, date: item.bid.date, amount: item.bid.amount})}
                    >Edit</button>
                    <button className='btn btn-danger' onClick={() => deleteLicense(item.id)}>Delete</button>
                </td>
            </tr>
        })}
        </tbody>
    </table>
}

export default TableList