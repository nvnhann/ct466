import React from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import PropTypes from 'prop-types';
import Animate from "../Animate";
import {Button, Typography} from "@material-ui/core";
import InputText from "../Form-control/InputText";
import PasswordField from "../Form-control/PasswordField";


RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
}

function RegisterForm(props) {
    const handleSubmit = async (value) => {
        const {onSubmit} = props;
        if (onSubmit) {
            await onSubmit(value);
        }
    }

    const schema = yup.object().shape({
        email: yup.string().required("Vui lòng nhập email").email('Email không hơp lệ  '),
        password: yup.string().required("Vui lòng nhập mật khảu").min(8, 'Mật khẩu ít nhất 8 ký tự'),
        repwd: yup.string().required("Vui lòng nhập lại mật khảu").oneOf([yup.ref('password')], 'Mật khẩu không khớp')

    });
    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
            repwd: ''
        },
        resolver: yupResolver(schema)
    });


    return (
        <Animate animation="transition.expandIn" delay={300}>
            <div className="min-h-screen bg-gray-100 pt-28 flex flex-col justify-center ">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div
                        className="absolute inset-0 bg-gradient-to-r  from-gray-300 to-gray-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-4xl text-center h3 font-semibold">Đăng ký tài khoản</h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative">
                                        <div className="flex flex-col items-center justify-center max-w-sm">
                                            <form
                                                name="loginForm"
                                                noValidate
                                                onSubmit={form.handleSubmit(handleSubmit)}
                                            >
                                                <InputText name="email" lable="Email" form={form} fullWidth/>
                                                <PasswordField name="password" lable="Mật khẩu" form={form}/>
                                                <PasswordField name="repwd" lable="Nhập lại mật khẩu" form={form}/>
                                                <Button
                                                    style={{
                                                        width: '22.4rem',
                                                        marginLeft: 'auto',
                                                        marginRight: 'auto',
                                                        marginTop: '1.6rem'
                                                    }}
                                                    variant="contained" color="primary"
                                                    aria-label="signup"
                                                    type="submit"
                                                >
                                                    Đăng ký
                                                </Button>
                                            </form>
                                            <div className="flex flex-col items-center justify-center"
                                                 style={{marginTop: '2rem'}}>
                                                <span>Bạn đã có tài khoản?</span>
                                                <Typography component='a' href='/app/login'>Đăng nhập</Typography>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Animate>

    )
}

export default RegisterForm;