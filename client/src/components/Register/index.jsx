import React from 'react';
import RegisterForm from "./RegisterForm";
import {useSnackbar} from 'notistack';
import {useHistory} from "react-router-dom";
import userAPI from "../../API/userAPI";

function Register() {
    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();
    const handleSubmit = async (values) => {
        try {
            await userAPI.signup(values);
            enqueueSnackbar('Đăng ký thành công', {variant: 'success', autoHideDuration: 2000})
            history.push("/login");
        } catch (error) {
            enqueueSnackbar(error.message, {variant: 'error', autoHideDuration: 2000})
            console.log(error)
        }
    }
    return (
        <>
            <RegisterForm onSubmit={handleSubmit}/>
        </>
    )
}

export default Register;