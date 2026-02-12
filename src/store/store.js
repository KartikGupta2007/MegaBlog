import {configureStore} from '@reduxjs/toolkit'
import authReducer from './AuthFile';

const  store = configureStore({
    reducer: {
        auth: authReducer
    }
})

export default store;