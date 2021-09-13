import React from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import background from '../../Assets/background.jpg'
import Animate from "../Animate";
import {Button, Divider} from "@material-ui/core";
import InputText from "../Form-control/InputText";
import PasswordField from "../Form-control/PasswordField";
import GoogleIcon from '../UI/GoogleIcon';
import FacebookIcon from '@material-ui/icons/Facebook';
import {signInWithGoogle} from "../../firebase/firebase.utils";
import {useDispatch} from "react-redux";
import {registerpage} from "../../Store/loginpageSlice";

const useStyle = makeStyles(({
    background: {
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '93.2vh',


    },
    or: {
        display: 'flex',
        marginTop: '.8rem',
        marginBottom: '.8rem',
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContent: {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }

}));

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
}

function LoginForm(props) {
    const classes = useStyle();
    const dispatch = useDispatch();
    const handleSubmit = async (value) => {
        const {onSubmit} = props;
        if (onSubmit) {

            await onSubmit(value);
            form.reset();
        }
    }

    const schema = yup.object().shape({
        email: yup.string().required("Vui lòng nhập tên đăng nhập"),
        password: yup.string().required("Vui lòng nhập mật khẩu")
    });
    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(schema)
    });


    return (
        <Animate animation="transition.expandIn" delay={300}>
            <div className="min-h-screen bg-gray-100 pt-28 flex flex-col justify-center ">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-4xl font-semibold text-center">Đăng nhập</h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative">
                                        <div className="flex flex-col items-center justify-center max-w-sm">
                                            <form
                                                name="loginForm"
                                                noValidate
                                                className={classes.formContent}
                                                onSubmit={form.handleSubmit(handleSubmit)}
                                            >
                                                <InputText name="email" lable="Email" form={form} fullWidth/>
                                                <PasswordField name="password" lable="Mật khẩu" form={form}/>
                                                <Button
                                                    style={{
                                                        width: '22.4rem',
                                                        marginLeft: 'auto',
                                                        marginRight: 'auto',
                                                        marginTop: '1.6rem'
                                                    }}
                                                    variant="contained" color="primary"
                                                    aria-label="LOG IN"
                                                    type="submit"
                                                >
                                                    Đăng nhập
                                                </Button>
                                            </form>
                                            <div className={classes.or}>
                                                <Divider style={{width: '3.2rem'}}/>
                                                <span style={{marginLeft: '0.8rem', marginRight: '0.8rem'}}>Hoặc</span>
                                                <Divider style={{width: '3.2rem'}}/>
                                            </div>
                                            <Button variant="contained" color="primary" size="small"
                                                    style={{
                                                        textTransform: 'none',
                                                        width: '19.2rem',
                                                        marginBottom: '.8rem'
                                                    }}
                                                    startIcon={<FacebookIcon/>}
                                            >
                                                Đăng nhập bằng Facebook
                                            </Button>

                                            <Button variant="contained" color="secondary" size="small"
                                                    style={{
                                                        textTransform: 'none',
                                                        width: '19.2rem',
                                                        marginBottom: '.8rem'
                                                    }}
                                                    onClick={signInWithGoogle}
                                                    startIcon={<GoogleIcon/>}
                                            >
                                                Đăng nhập bằng Google
                                            </Button>
                                            <div className={classes.formContent}>
                                                <span>Bạn chưa có tài khoản?</span>
                                                <Button style={{textTransform: 'none'}} onClick={()=>{
                                                    dispatch(registerpage())
                                                }}>Đăng ký tài khoản</Button>
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

export default LoginForm;