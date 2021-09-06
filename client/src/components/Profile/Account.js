import React from 'react';
import {Divider, Paper} from "@material-ui/core";

export default function Account() {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <div>
            <Paper elevation={3} className='p-10'>
                <div className='text-3xl text-gray-500 text-center font-semibold'>Bảng điều khiển tài khoản</div>
                <div className='text-xl text-gray-500 my-8'>Họ Và tên:
                    <span className='font-semibold'> Nguyễn Văn nhẫn</span>
                </div>
                <div className='text-xl text-gray-500 my-8'>Email:
                    <span className='font-semibold'> nvnhan.dev@gmail.com</span>
                </div>
                <div className='text-xl text-gray-500 my-8'>Số điện thoại:
                    <span className='font-semibold'> 0794351150</span>
                </div>
                <Divider/>
                <div className='text-xl text-gray-500 my-8'>Số đơn hàng thành công năm {year}:
                    <span className='font-semibold'> 0</span>
                </div>
                <div className='text-xl text-gray-500 my-8'>Số tiền đã thanh toán năm {year}:
                    <span className='font-semibold'> 0 đ</span>
                </div>
                <Divider/>
                <div className='text-xl text-gray-500 my-8'>Địa chỉ giao hàng mặc định:
                    <span className='font-semibold'> Hẻm 391, Hưng lợi, Ninh Kiều, Cần Thơ</span>
                </div>
            </Paper>
        </div>
    )
}