import React, {useState} from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import PropTypes from 'prop-types';
import Animate from "../Animate";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    TextField,
    Typography
} from "@material-ui/core";
import InputText from "../Form-control/InputText";
import PasswordField from "../Form-control/PasswordField";
import OtpAPI from "../../API/OtpAPI";
import {useSnackbar} from "notistack";
import {useDispatch} from "react-redux";
import {loginpage} from "../../Store/loginpageSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
}

function RegisterForm(props) {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    const [check, setCheck] = useState(false);
    const [open, setOpen] = useState(false);
    const [otp, setOtp] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


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

    const getOTP = async (value) => {
        try{
            await OtpAPI.get({email: value});
            handleClickOpen()
        }catch (err){
            enqueueSnackbar(err.message, {variant: 'error', autoHideDuration: 2000})
        }
    }
    const verifyOTP = async () => {
        if(otp==='') return;
        try {
            await OtpAPI.post({otp:otp, email: form.getValues('email')});
            enqueueSnackbar("Xác nhận thành công!", {variant: 'success', autoHideDuration: 2000})
            handleClose();
            setCheck(true);
        }catch (err){
            enqueueSnackbar(err.message, {variant: 'error', autoHideDuration: 2000})
        }
    }

    return (
        <>
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
                                    <div
                                        className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                        <div className="relative">
                                            <div className="flex flex-col items-center justify-center max-w-sm">
                                                <form
                                                    name="loginForm"
                                                    noValidate
                                                    onSubmit={form.handleSubmit(handleSubmit)}
                                                >
                                                    <InputText name="email" lable="Email" form={form} fullWidth/>
                                                    {check ? (<>
                                                        <PasswordField name="password" lable="Mật khẩu" form={form}/>
                                                        <PasswordField name="repwd" lable="Nhập lại mật khẩu"
                                                                       form={form}/>
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
                                                    </>) : (
                                                        <Button
                                                            style={{
                                                                width: '24.4rem',
                                                                marginLeft: 'auto',
                                                                marginRight: 'auto',
                                                                marginTop: '1.6rem',
                                                                textTransform: 'none'
                                                            }}
                                                            variant="contained" color="primary"
                                                            aria-label="signup"
                                                            type="submit"
                                                            onClick={() => {
                                                                console.log(form.errors['email'])
                                                                if (form.errors['email'] !== undefined || form.getValues('email') === '') return;
                                                                getOTP(form.getValues('email'))

                                                            }}

                                                        >
                                                            Gữi mã OTP
                                                        </Button>
                                                    )}
                                                </form>
                                                <div className="flex flex-col items-center justify-center"
                                                     style={{marginTop: '2rem'}}>
                                                    <span>Bạn đã có tài khoản?</span>
                                                    <Button style={{textTransform: 'none'}} onClick={()=>{
                                                        dispatch(loginpage())
                                                    }}>Đăng nhập</Button>
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
            <Dialog
                open={open}
                onClose={(e, reason) => {
                    if (reason === 'backdropClick') return;
                    if (reason === 'escapeKeyDown') return;
                    handleClose();

                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}

            >
                <DialogTitle>
                    <div className='text-2xl text-center text-gray-500 font-semibold w-96'>Xác nhận OTP</div>
                    <div className='text-2xl text-center text-gray-900'>Mã OTP đã gửi vào email của bạn</div>
                </DialogTitle>
                <form>
                    <DialogContent>

                        <TextField label="Mã xác nhận OTP" variant="outlined" margin="normal" fullWidth onChange={(e)=>setOtp(e.target.value)}/>
                    </DialogContent>
                    <DialogActions>
                        <Button  style={{textTransform: 'none'}} variant='contained' color='primary' onClick={verifyOTP}>
                            Xác nhận
                        </Button>
                        <Button style={{textTransform: 'none'}} onClick={handleClose}>
                            Hủy
                        </Button>

                    </DialogActions>
                </form>
            </Dialog>

        </>
    )
}

export default RegisterForm;