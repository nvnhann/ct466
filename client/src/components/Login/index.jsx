import React from 'react';
import {login} from '../../Store/userSlice';
import {unwrapResult} from '@reduxjs/toolkit';
import {useSnackbar} from "notistack";
import LoginForm from './LoginForm';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

function Login() {
    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    const handleSubmit = async (values) => {
        try {
            const rs = await dispatch(login(values));
            unwrapResult(rs);
            history.goBack()
        } catch (error) {
            enqueueSnackbar(error.message, {variant: 'error', autoHideDuration: 2000})
        }

    }
    return (
        <>

            <LoginForm onSubmit={handleSubmit}/>
        </>
    )
}

export default Login;