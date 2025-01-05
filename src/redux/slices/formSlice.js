import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    text:"",
    fontOption:"",
    textOption:""

}


const formSlice = createSlice({
    name:"form",
    initialState,
    reducers:{
        storeFormData(state,action){
            state.text = action.payload.text
            state.fontOption = action.payload.fontOption
            state.textOption = action.payload.textOption
        },
        reset(state){
            state.text = ""
            state.fontOption = ""
            state.textOption = ""
        }
    }
})

export const {storeFormData,reset} = formSlice.actions;
export default  formSlice.reducer