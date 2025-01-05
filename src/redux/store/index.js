import { configureStore } from "@reduxjs/toolkit";
import modalReducers from '../slices/modalSlice'
import formReducers from '../slices/formSlice'

export const store = configureStore({
    reducer:{
        modalReducers,
        formReducers
    }
})