import React from 'react';
import Header from '../UI/Header';
import {Route, useRouteMatch} from "react-router-dom";
import Login from "../Login";
import Register from "../Register";

export default function HomePage() {
    const {path} = useRouteMatch();
    return (
        <>
            <Header/>
            <Route exact path={`${path}/login`} component={() => <Login />  }/>
            <Route exact path={`${path}/register`} component={() => <Register />  }/>
        </>
    )
}