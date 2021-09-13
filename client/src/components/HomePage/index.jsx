import React from 'react';
import Header from '../UI/Header';
import {Route, Switch, useRouteMatch} from "react-router-dom";
import PrivateRoute from "../Router/ProtectRoute";
import Profile from "../Profile";
import LoginPage from "../LoginPage";

export default function HomePage() {
    const {path} = useRouteMatch();

    return (
        <>
            <Header/>
            <Switch>
                <Route exact path={`${path}/login`} component={() => <LoginPage/>}/>
                <PrivateRoute exact path={`${path}/profile`} component={() => <Profile/>}/>
            </Switch>


        </>
    )
}