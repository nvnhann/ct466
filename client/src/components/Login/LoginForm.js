import React from 'react';
import {Box, Button, Divider, Grid, Typography} from '@material-ui/core';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import InputText from '../Form-control/InputText';
import PasswordField from '../Form-control/PasswordField';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import background from '../../Assets/background.jpg'
import {signInWithGoogle} from '../../firebase/firebase.utils';
import FacebookIcon from '@material-ui/icons/Facebook';
import GoogleIcon from "../UI/GoogleIcon";

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

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
}

function LoginForm(props) {
    const classes = useStyle();
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
        <Grid container direction="row" style={{marginTop: '4em'}}>
            <Grid item container direction="column" alignContent="center" justifyContent="center" lg={4}>
                <Grid item>
                    <Box m={4} className={classes.formContent} >
                        <Typography variant="h3" style={{lineHeight: 1, textAlign: 'center'}}>Đăng nhập</Typography>
                        <form
                            name="loginForm"
                            noValidate
                            className={classes.formContent}
                            onSubmit={form.handleSubmit(handleSubmit)}
                        >
                            <InputText name="email" lable="Email" form={form} fullWidth/>
                            <PasswordField name="password" lable="Mật khẩu" form={form}/>
                            <Button
                                style={{width: '22.4rem', marginLeft:'auto', marginRight:'auto', marginTop: '1.6rem'}}
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
                                style={{textTransform: 'none', width: '19.2rem', marginBottom:'.8rem'}}
                                startIcon={<FacebookIcon />}
                        >
                            Đăng nhập bằng Facebook
                        </Button>

                        <Button variant="contained" color="secondary" size="small"
                                style={{textTransform: 'none', width: '19.2rem', marginBottom:'.8rem'}}
                                onClick={signInWithGoogle}
                                startIcon={<GoogleIcon />}
                        >
                            Đăng nhập bằng Google
                        </Button>
                        <div className={classes.formContent}>
                            <span>Bạn chưa có tài khoản?</span>
                            <Typography component='a' href='/signup'>Đăng ký tài khoản</Typography>
                        </div>
                    </Box>
                </Grid>
            </Grid>
            <Grid item container lg={8} className={classes.background}>

            </Grid>
        </Grid>
    )
}

export default LoginForm;