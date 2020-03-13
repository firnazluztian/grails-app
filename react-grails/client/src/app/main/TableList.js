import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../../config'
import axios from 'axios' 
import { toastSuccess, toastDanger } from '../widget/toaster'

const tableHeader = ['#', 'Name', 'Class', 'License Number', 'Bid Date', 'Bid Amount', 'Action']

const TableList = ({ setIsEdit, refresh, setRefresh }) => {
    const [licenses, setLicenses] = useState({data:[]})
    
    const getLicense = async () => {
        await axios
        .get(SERVER_URL + 'license')
        .then(res => { setLicenses(res); setRefresh(false) })
        .catch(err => { toastDanger(`${err}, please try again`); console.log('@getLicense', err) }) 
    }

    const deleteLicense = async (id) => {
        axios.delete(SERVER_URL + 'license/' + id)
        .then(() => { setRefresh(true); toastSuccess('succesfully deleted') })
        .catch(err => { toastDanger(`${err}, please try again`); console.log('@deleteLicense', err) })
    } 
    
    useEffect(() => { getLicense() }, [refresh])

    return <table className='table table-hover text-center table-dark table-striped'>
        <thead>
            <tr>{tableHeader.map((item, index) => <th scope='col' key={index}>{item}</th>)}</tr>
        </thead>
        <tbody>
        {licenses.data.map((rowItem, index) => {
            return <tr key={index}>
                <th scope='row'>{rowItem.id}</th>
                {[rowItem.driver.name, rowItem.classType, rowItem.licenseNum, rowItem.bid.date, rowItem.bid.amount].map((item, i) => <td key={i}>{item}</td>)}
                <td>
                    <button 
                        className='btn btn-primary mr-1' 
                        onClick={() => setIsEdit({ 
                            edit: true, id: rowItem.id, name: rowItem.driver.id, class: rowItem.classType, licenseNum: rowItem.licenseNum, date: rowItem.bid.date, amount: rowItem.bid.amount
                        })}
                    >Edit</button>
                    <button 
                        className='btn btn-danger' 
                        onClick={() => deleteLicense(rowItem.id)}
                    >Delete</button>
                </td>
            </tr>
        })}
        </tbody>
    </table>
}

export default TableList