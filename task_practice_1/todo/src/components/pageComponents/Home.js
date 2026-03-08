import React from 'react'
import CommonForm from '../common/CommonForm'
import { useState } from 'react'
import { fetchApi } from '../../utils/fetchApi'
import { useEffect } from 'react'
import Note from '../common/Note'
import { useMemo } from 'react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    const [selectedRecord, setSelectedRecord] = useState({})
    const [allRecord, setAllRecord] = useState([])
    const [showForm, setShowForm] = useState(false)
    let parsedData = {}

    try {
        const getUserData = localStorage.getItem("userData")
        parsedData = JSON.parse(getUserData)
    } catch (error) {
        console.log("Error in parse data:", error)
    }

    const fieldData = [

        { label: "Title", type: "text", name: "title" },
        { label: "Description", type: "text", name: "description" },

    ]

    const apiData = {
        endpoint: selectedRecord._id ? `note?_id=${selectedRecord._id}` : `note?user=${parsedData?._id}`,
        method: "POST"
    }


    const onSubmit = useCallback((data) => {
        if (data.status === 200) {

            const newRecord = data?.data?.data ?? {}
            console.log({ newRecord })
            if (selectedRecord._id) {
                const newData = allRecord.map((r) => r._id === selectedRecord._id ? { ...r, ...newRecord } : r)
                setAllRecord(newData)
                setSelectedRecord({})
                setShowForm(false)
            } else {
                setSelectedRecord({})
                setShowForm(false)
                setAllRecord([...allRecord, newRecord])
            }
        }
    }, [allRecord, selectedRecord, setSelectedRecord])


    const props = useMemo(() => (
        {
            fieldData,
            formName: "Add New Note",
            apiData,
            onSubmit,
            defaultFormData: selectedRecord,

        }
    ), [selectedRecord, allRecord, setSelectedRecord])

    const onEdit = (data) => {
        setSelectedRecord(data)
        setShowForm(true)

    }


    const onDelete = async (data) => {
        const response = await fetchApi({
            endpoint: `note?_id=${data?._id}`,
            method: "DELETE",
        })
        if (response.status === 200) {
            const newData = allRecord.filter((r) => r._id !== data._id)
            setAllRecord(newData)
        }


    }


    const getRecord = async () => {

        const response = await fetchApi({
            endpoint: `note/${parsedData?._id}`,
            method: "GET",

        })
        if (response.status === 200) {
            setAllRecord(response?.data?.data ?? [])

        }

    }

    useEffect(() => {
        getRecord()
    }, [])

    const onLogout = () => {
        ["token", "user"].forEach((i) => localStorage.removeItem(i))
        navigate("/login")


    }
    return (
        <div>
            <div className='p-3 d-flex justify-content-between'>    <h1>Note List</h1> <div>{parsedData?.name} &nbsp; <button className='btn btn-danger' onClick={onLogout}>Logout</button></div></div>
            <button className='btn btn-danger' onClick={() => setShowForm(true)}>Add new reocrd</button>

            <div className='p-5'>

                {showForm && < CommonForm {...props} />}
            </div>

            <div>
                {allRecord.map((r, i) => {
                    return (
                        <Note key={i} data={r} onEdit={onEdit} onDelete={onDelete} />
                    )
                })}
            </div>

        </div>
    )
}

export default Home