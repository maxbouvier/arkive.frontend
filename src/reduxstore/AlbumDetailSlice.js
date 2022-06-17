import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    album_id:'',
    album_name:'',
    isAdmin:0,
    album_members:0,
    members_details:[],
    other_friends_details:[],
    media:[]

}
export const albumDetailSlice = createSlice({
    name: "albumDetailSlice",
    initialState,
    reducers: {
        storeAlbumDetails(state, { payload }) {
            state.album_id = payload.album_id
            state.album_name=payload.album_name
            state.album_members=payload.album_members
            state.members_details=payload.members_details
            state.other_friends_details=payload.other_friends_details
            state.media=payload.media
            state.isAdmin=payload.isAdmin
        }
    },
    extraReducers: {

    }
})
export const { storeAlbumDetails } = albumDetailSlice.actions
export const albumDetailReducer = albumDetailSlice.reducer