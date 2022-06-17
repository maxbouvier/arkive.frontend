import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    deviceToken:"",
    deviceName:"",
    deviceVersion:"",
    device_type:""

}
export const pushNotificationDataSlice = createSlice({
    name: "pushNotificationDataSlice",
    initialState,
    reducers: {
        storePushRelatedData(state, { payload }) {
            state.deviceToken = payload.deviceToken
            state.deviceName=payload.deviceName
            state.deviceVersion=payload.deviceVersion
            state.device_type=payload.device_type
        }
    },
    extraReducers: {

    }
})
export const { storePushRelatedData } = pushNotificationDataSlice.actions
export const pushNotificationDataReducer = pushNotificationDataSlice.reducer