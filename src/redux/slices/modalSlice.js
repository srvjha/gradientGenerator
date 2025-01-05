import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status:false
}


const modalSlice = createSlice({
    name:"modal",
    initialState,
    reducers:{
        openModal(state){
            state.status = true
        },
        closeModal(state){
            state.status = false
        }
    }
})

export const {openModal,closeModal} = modalSlice.actions;
export default  modalSlice.reducer