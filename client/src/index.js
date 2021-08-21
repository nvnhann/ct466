import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import './index.css';
import App from './components/App';
import {SnackbarProvider} from "notistack";
import store from './Store/store';
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <SnackbarProvider anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
                <App/>
            </SnackbarProvider>
        </Router>
    </Provider>
    , document.getElementById('root')
);

