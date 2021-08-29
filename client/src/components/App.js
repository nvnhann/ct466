import {ThemeProvider} from "@material-ui/styles";
import theme from './UI/Theme';
import {Redirect, Route, Switch} from "react-router-dom";
import PrivateRoute from "./Router/PrivateRoute";
import DashBoard from "./DashBoard";
import HomePage from "./HomePage";
import {useSelector} from "react-redux";
import React from "react";

function App() {
    const isAdmin = useSelector(state => state.user.current.role) === 'ADMIN';
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <main>
                    <Switch>
                        <Redirect from="/" to="/app" exact/>
                        <Route path="/app" component={HomePage} />
                        <PrivateRoute exact path="/dashboard" component={DashBoard}/>
                    </Switch>
                    {isAdmin && <Redirect
                        to={{
                            pathname: "/dashboard",
                        }}
                    />}
                </main>
            </ThemeProvider>
        </div>
    );
}

export default App;
