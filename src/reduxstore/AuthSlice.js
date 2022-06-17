import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    access_token: '',
    userName: '',
    fullName: '',
    profile_photo:'',
    userId:'',
    photo_count:0,
    profile_created:''

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
            state.profile_photo=payload.profile_photo
            state.userId=payload.userId
            state.photo_count=payload.photo_count
            state.profile_created=payload.profile_created
        }
    },
    extraReducers: {

    }
})
export const { storeAuthData } = authSlice.actions
export const authReducer = authSlice.reducer