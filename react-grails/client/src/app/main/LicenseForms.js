import React from 'react'

const classTypes = ['CLASS_A', 'CLASS_B', 'CLASS_C']

const LicenseForms = ({ drivers, input, setInput, handleChange, handleSubmit, setIsEdit, isEdit, inputInitialState }) => {
    return <div className='row mb-2 p-1'>
        
        <div className='col-sm input-group'>
            <select 
                id="inputState" 
                className="form-control" 
                name='name' 
                value={input.name} 
                onChange={handleChange}
            >
                <option value='' disabled hidden>Choose driver</option>
                {drivers.data.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
            </select>
        </div>

        <div className='col-sm input-group'>
            <select 
                id="inputState" 
                className="form-control" 
                name='class' 
                value={input.class} 
                onChange={handleChange}
            >
                <option value='' disabled hidden>Choose class</option>
                {classTypes.map((item, index) => <option key={index} value={item}>{item}</option>)}
            </select>
        </div>
        
        <div className='col-sm input-group'>
            <input 
                className='form-control' 
                type='number' 
                placeholder='License number' 
                name='licenseNum' 
                value={input.licenseNum} 
                onChange={handleChange} 
            />
        </div>

        <div className='col-sm input-group'>
            <input 
                className='form-control' 
                type='date' 
                placeholder='License number' 
                name='date' 
                value={input.date} 
                onChange={handleChange} 
            />
        </div>

        <div className='col-sm input-group'>
            <input 
                className='form-control' 
                type='number' 
                placeholder='Bid amount' 
                name='amount' 
                value={input.amount} 
                onChange={handleChange} 
            />
        </div>

        {!isEdit.edit && 
        <div className='col-sm input-group'>
            <button className='btn btn-success mr-1' onClick={handleSubmit}>Add</button>
        </div>}

        {isEdit.edit && 
        <div className='col-sm input-group'>
            <button className='btn btn-primary mr-1' onClick={handleSubmit}>Edit</button>
            <button className='btn btn-success mr-1' onClick={() => { setIsEdit({edit: false}); setInput(inputInitialState) }}>Cancel</button>
        </div>}
        
    </div>
}

export default LicenseForms