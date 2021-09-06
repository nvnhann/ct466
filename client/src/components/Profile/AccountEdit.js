import React from 'react';
import {Button, Paper, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyle = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    }
}))
export default function AccountEdit(){
    const classes = useStyle();
    return (
        <Paper elevation={3} className='p-10'>
            <div className='text-3xl text-gray-500 text-center font-semibold'>Thông tin tài khoản</div>
            <form className={classes.root}>
              <div>
                  <TextField className='m-4' variant='filled' label='Họ' />
                  <TextField variant='filled' label='Tên' />
              </div>
                <div>
                    <TextField className='m-4' style={{width: '20rem'}} variant='filled' label='Số điện thoại' />
                </div>
                <div>
                    <TextField fullWidth className='m-4' variant='filled' label='Email' />
                </div>
                <Button style={{marginLeft: '.75rem'}} variant='contained' color='primary'>Lưu thay đổi</Button>
            </form>
        </Paper>
        )
}