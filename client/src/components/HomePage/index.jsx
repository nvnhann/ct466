import React from 'react';
import Header from '../UI/Header';
import {Route, Switch, useRouteMatch} from "react-router-dom";
import Login from "../Login";
import Register from "../Register";
import PrivateRoute from "../Router/ProtectRoute";
import Profile from "../Profile";

export default function HomePage() {
    const {path} = useRouteMatch();
    return (
        <>
            <Header/>
            <Switch>
                <Route exact path={`${path}/login`} component={() => <Login />  }/>
                <Route exact path={`${path}/register`} component={() => <Register />  }/>
                <PrivateRoute exact path={`${path}/profile`} component={()=> <Profile />}  />
            </Switch>


        </>
    )
}