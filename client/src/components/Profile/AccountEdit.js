import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Paper, Slide} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import InputFilled from "../Form-control/InputFilled";
import profileAPI from "../../API/profileAPI";
import {useSnackbar} from "notistack";
import PasswordField from "../Form-control/PasswordField";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";


const useStyle = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
        marginTop: '1rem'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AccountEdit() {
    const classes = useStyle();
    const {enqueueSnackbar} = useSnackbar();
    const profile = useSelector(state => state.profile.account);
    const email = useSelector(state => state.user.current.email);
    const [disabled, setDisabled] = useState(true);
    const [open, setOpen] = useState(false);
    const schema = yup.object().shape({
        password: yup.string().required("Vui lòng nhập mật khảu"),
        repwd: yup.string().required("Vui lòng nhập lại mật khảu").oneOf([yup.ref('password')], 'Mật khẩu không khớp')

    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const form = useForm({
        defaultValues: {
            firstname: profile.ten,
            lastname: profile.ho || '',
            phone: profile.sdt || '',
            email: email
        },
    });

    const formP = useForm({
        defaultValues: {
            password: '',
        },
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data) => {
        console.log(data)
        try {
            await profileAPI.create(data);
            enqueueSnackbar('Cập nhật thành công', {variant: 'success', autoHideDuration: 2000});
        } catch (error) {
            enqueueSnackbar(error.message, {variant: 'error', autoHideDuration: 2000})
            console.log(error)
        }
    }

    const onSubmitP = async (data)=>{

    }
    return (
        <Paper elevation={3} className='p-10'>
            <div className='text-3xl text-gray-500 text-center font-semibold'>Thông tin tài khoản</div>
            <form
                className={classes.root}
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div>
                    <InputFilled name="lastname" form={form} lable='Họ'/>
                    <InputFilled name="firstname" form={form} lable='Tên'/>
                </div>
                <div>
                    <InputFilled name="phone" form={form} style={{width: '20rem'}} lable='Số điện thoại'/>
                </div>
                <Button
                    style={{marginLeft: '.75rem', textTransform: 'none', marginBottom: '.75rem'}}
                    variant='contained'
                    color='primary'
                    type="submit">
                    Lưu thay đổi
                </Button>
            </form>
            <Divider/>
            <form className={classes.root}>
                <div className='text-lg text-gray-500 font-semibold'>Tài khoản đăng nhập</div>
                <div>
                    <InputFilled fullWidth form={form} disabled={disabled} name="email" lable='Email'/>
                    {!disabled && <Button
                        style={{marginLeft: '.75rem', textTransform: 'none', marginBottom: '.75rem'}}
                        variant='contained'
                        color='primary'
                        type="submit">
                        Lưu thay đổi
                    </Button>}
                    {disabled && <Button
                        style={{marginLeft: '.75rem', textTransform: 'none', marginBottom: '.75rem'}}
                        variant='contained'
                        color='primary'
                        onClick={handleClickOpen}
                    >
                        Thay đổi
                    </Button>}
                </div>
            </form>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                disableBackdropClick
                disableEscapeKeyDown
            >
                <DialogTitle>
                    <div className='text-2xl text-center text-gray-500 font-semibold'>Xác nhận tài khoản</div>
                </DialogTitle>
                <form onSubmit={formP.handleSubmit(onSubmitP)}>
                    <DialogContent>
                        <PasswordField name="password" lable="Mật khẩu" form={formP}/>
                    </DialogContent>
                    <DialogActions>
                        <Button type='submit' style={{textTransform: 'none'}} variant='contained' color='primary'>
                            Xác nhận
                        </Button>
                        <Button style={{textTransform: 'none'}} onClick={handleClose}>
                            Hủy
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Paper>
        )
}