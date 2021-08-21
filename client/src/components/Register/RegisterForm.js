import React from 'react';
import {Box, Button, Grid, Typography} from '@material-ui/core';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import InputText from '../Form-control/InputText';
import PasswordField from '../Form-control/PasswordField';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import background from '../../Assets/background.jpg'

const useStyle = makeStyles(({
    background: {
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '92.8vh'

    },
    or: {
        display: 'flex',
        marginTop: '2.4rem',
        marginBottom: '2.4rem',
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

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
}

function RegisterForm(props) {
    const classes = useStyle();
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
        <Grid container direction="row" style={{marginTop: '4em'}}>
            <Grid item container direction="column" alignContent="center" justifyContent="center" lg={4}>
                <Grid item>
                    <Box m={4} className={classes.formContent}>
                        <Typography variant="h3" style={{lineHeight: 1, textAlign: 'center'}}>Đăng ký</Typography>
                        <form
                            name="loginForm"
                            noValidate
                            className={classes.formContent}
                            onSubmit={form.handleSubmit(handleSubmit)}
                        >
                            <InputText name="email" lable="Email" form={form} fullWidth/>
                            <PasswordField name="password" lable="Mật khẩu" form={form}/>
                            <PasswordField name="repwd" lable="Nhập lại mật khẩu" form={form}/>

                            <Button
                                style={{width: '22.4rem', marginLeft: 'auto', marginRight: 'auto', marginTop: '1.6rem'}}
                                variant="contained" color="primary"
                                aria-label="signup"
                                type="submit"
                            >
                                Đăng ký
                            </Button>
                        </form>
                        <div className={classes.formContent} style={{marginTop: '2rem'}}>
                            <span>Bạn đã có tài khoản?</span>
                            <Typography component='a' href='/login'>Đăng nhập</Typography>
                        </div>
                    </Box>
                </Grid>
            </Grid>
            <Grid item container lg={8} className={classes.background}>

            </Grid>
        </Grid>
    )
}

export default RegisterForm;