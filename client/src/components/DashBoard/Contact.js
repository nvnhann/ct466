import React from 'react';
import Animate from "../Animate";

export default function Contact() {
    return (
        <Animate animation="transition.expandIn" delay={300}>
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center ">
                <div className="bg-white  shadow-lg mx-auto border-b-4 border-gray-500 rounded-2xl overflow-hidden  transition duration-500 transform  cursor-pointer">
                    <div className="bg-gray-500  flex h-20  items-center">
                        <p className="mx-4 text-white text-2xl uppercase">Nếu cần hỗ trợ kỹ thuật, quý khách vui lòng liên hệ</p>
                    </div>
                    <div className="py-2 px-6 text-2xl tracking-wide">Sđt: <a className="text-red-500" href="tel:0794351150">0794351150</a></div>
                    <div className="py-2 px-6 text-2xl tracking-wide">Email: <a className="text-red-500" href="mailto:nvnhan.dev@gmail.com">nvnhan.dev@gmail.com</a></div>
                    <div className="py-2 px-6 text-2xl tracking-wide">Facebook: <a className="text-red-500"  href="https://www.facebook.com/nvnhan.dev">Nhẫn</a></div>
                </div>
            </div>
        </Animate>
    )
}