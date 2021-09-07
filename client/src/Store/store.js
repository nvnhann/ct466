import userReducer from './userSlice';
import profileReducer from  './profileSlice'
const {configureStore} = require('@reduxjs/toolkit');

const rootReducer = {
    user: userReducer,
    profile: profileReducer
}

const store = configureStore({
    reducer: rootReducer
})

export default store;