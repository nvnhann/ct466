import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";


export default function PrivateRoute({component: Component, ...rest}) {
    const isAdmin = !!useSelector(state => state.user.current.email);
    return (
        <Route
            {...rest}
            render={props =>
                isAdmin ? (<Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/app/login",
                            state: {from: props.location}
                        }}
                    />
                )
            }
        />)
}
;