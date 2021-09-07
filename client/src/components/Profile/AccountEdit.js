import React from 'react';
import {Button, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import InputFilled from "../Form-control/InputFilled";
import * as yub from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import profileAPI from "../../API/profileAPI";
import {useSnackbar} from "notistack";


const useStyle = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
        marginTop: '1rem'
    }
}))
export default function AccountEdit() {
    const classes = useStyle();
    const {enqueueSnackbar} = useSnackbar();
    const profile = useSelector(state => state.profile.account);
    const email = useSelector(state => state.user.current.email);

    const schema = yub.object().shape({
        firtname: yub.string().required('Không được để trống!'),
        lastname: yub.string().required('Không được để trống!'),
        phone: yub.string().required('Không được để trống!'),
        email: yub.string().required('Không được để trống!')
    })
    const form = useForm({
        defaultValues: {
            firstname: profile.ten ,
            lastname: profile.ho || '',
            phone: profile.sdt || '',
            email: email
        },
        resolver: yupResolver(schema)
    });

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
                <div>
                    <InputFilled fullWidth form={form} name="email" lable='Email'/>
                </div>
                <Button
                    style={{marginLeft: '.75rem', textTransform: 'none' }}
                    variant='contained'
                    color='primary'
                    type="submit">
                    Lưu thay đổi
                </Button>
            </form>
        </Paper>
        )
}