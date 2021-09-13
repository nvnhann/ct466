import React, {useState} from 'react';
import Login from "../Login";
import {useSelector} from "react-redux";
import Register from "../Register";

export default function LoginPage(){
    const isLoginPage = useSelector(state => state.login.loginpage)


    return(
        <>
            {(isLoginPage==='LOGIN') && <Login />}
            {(isLoginPage==='REGISTER') && <Register />}
        </>
    )
}