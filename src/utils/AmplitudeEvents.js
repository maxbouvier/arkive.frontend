import { ampInstance } from "../App";
import { store } from '../reduxstore/index';
export const addEvent = (eventName) => {
    const state = store.getState();
    const userId = state.authSlice.userId;
    console.log("Event name == " + eventName + "===user id ===" + userId)
    ampInstance.logEvent(eventName, { userId: userId })
}
export const eventsNames = {
    PROFILEDONE: 'PROFILE_GO_BUTTON',
    PROFILESKIP: 'PROFILE_SKIP_BUTTON',
    ALBUMCREATED: 'ALBUM_CREATED',
    UPLOADIMAGETOALBUM: 'IMAGE_UPLOADED', 
    ADDFRIEND: 'ADD_NEW_FRIEND',

}