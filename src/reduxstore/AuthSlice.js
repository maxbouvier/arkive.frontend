import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    access_token: '',
    userName: '',
    fullName: '',

}
export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        storeAuthData(state, { payload }) {
            console.log("payload" + JSON.stringify(payload))
            state.access_token = payload.access_token
            state.fullName=payload.fullName
            state.userName=payload.userName
        }
    },
    extraReducers: {

    }
})
export const { storeAuthData } = authSlice.actions
export const authReducer = authSlice.reducer