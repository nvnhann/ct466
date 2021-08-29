import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";


export default function PrivateRoute({component: Component, ...rest}) {
    const isAdmin = useSelector(state => state.user.current.role) === 'ADMIN';
    return (
        <Route
            {...rest}
            render={props =>
                isAdmin ? (<Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: {from: props.location}
                        }}
                    />
                )
            }
        />)
}
;