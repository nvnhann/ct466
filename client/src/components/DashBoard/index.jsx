import React from 'react';
import HeaderAdmin from "../UI/HeaderAdmin";
import {Route} from "react-router-dom";
import Contact from "./Contact";

export default function DashBoard (){
    return (
        <>
            <HeaderAdmin />
            <main>
                <Route component={Contact} />
            </main>
        </>

    );
}