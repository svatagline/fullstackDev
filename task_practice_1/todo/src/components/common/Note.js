import React from 'react'

const Note = ({ data, onEdit,
    onDelete }) => {
    return (
        <div className='rounded border border-primary p-2 m-2' >

            <h5>{data?.title}</h5>

            <div> {data?.description}</div>
            <div><span className='btn btn-success' onClick={() => onEdit(data)}>Edit</span> &nbsp; <span className='btn btn-danger' onClick={() => onDelete(data)}> Delete</span></div>
        </div>
    )
}

export default Note