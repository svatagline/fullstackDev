import React from 'react'
import { fetchApi } from '../../utils/fetchApi'
import { useState } from 'react'
import { useEffect } from 'react'


const CommonForm = ({ fieldData, formName, apiData, onSubmit, defaultFormData }) => {
    const [formData, setFormData] = useState({})

    const handleFormData = ({ target }) => {
        const { name, value } = target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async () => {

        const { endpoint, method } = apiData

        const response = await fetchApi({
            endpoint,
            method,
            data: formData,

        })

        if (response.status === 200) {
            setFormData({})
            onSubmit(response)
        }

    }

    useEffect(() => {
        setFormData(defaultFormData)
    }, [defaultFormData])

    return (
        <div>
            <h3>{formName ?? 'Common form'}</h3>

            {
                fieldData.map((f, i) => {
                    return (
                        <div className="form-group" key={i}>
                            <label htmlFor={f.name}>{f.label}</label>
                            <input type={f.type} value={formData?.[f.name]} className="form-control" id={f.name} name={f.name} placeholder={`Enter ${f.label}`} onChange={handleFormData} />
                        </div>
                    )
                })
            }

            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default CommonForm