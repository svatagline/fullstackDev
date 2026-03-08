import React from 'react'
import CommonForm from '../common/CommonForm'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { fetchApi } from '../../utils/fetchApi';
import { useState } from 'react';

const Authentication = () => {
    const location = useLocation();
    const navigate = useNavigate()

    const isLoginPage = `${location.pathname}`.includes("login")
    const fieldData = [
        ...(isLoginPage ? [] : [{ label: "Name", type: "text", name: "name" }]),
        { label: "Emain", type: "email", name: "email" },
        { label: "Password", type: "password", name: "password" },
    ]
    const apiData = {
        endpoint: isLoginPage ? "auth/login" : "auth/register",
        method: "POST"
    }

    const onSubmit = (res) => {
        if (res.status === 200) {

            if (isLoginPage) {
                localStorage.setItem("token", res?.data?.token)
                localStorage.setItem("userData", JSON.stringify(res?.data?.data))
                navigate("/")
            } else {
                navigate("/login")

            }
        }
    }
    const props = {
        fieldData,
        formName: isLoginPage ? "Login Form" : "Register Form",
        apiData,
        onSubmit
    }


    return (
        <div>
            <CommonForm {...props} />
            <p>For {isLoginPage ? "Registration" : "Login"}         <Link to={isLoginPage ? `/register` : `/login`}>Click here</Link></p>

        </div>
    )
}

export default Authentication