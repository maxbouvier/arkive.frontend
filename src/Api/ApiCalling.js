import { configurations, http, apiPath, getHeader } from './ApiConfig';
import { showMessage } from "react-native-flash-message";
import { store } from '../reduxstore/index';
import { storeAuthData } from "../reduxstore/AuthSlice";
import * as NavigationReferance from '../navigation/NavigationReferance';
const { dispatch } = store;
export const post = async (apiName, requestData) => {
    const state = store.getState();
    const access_token = state.authSlice.access_token;
    try {
        const header = getHeader(access_token);
        const response = await http.post(configurations.baseUrl + apiName, requestData, header)
        console.log("Response ---" + JSON.stringify(response) + "response.data.responseCode" + response.data.responseCode)
        if (response.data.responseCode == 200) {
            return { isSucess: true, data: response.data.responseData }
        } else {
            if (response.data.responseCode == 401) {
                alert('Token Expired.')
                console.log("NavigationReferance--" + JSON.stringify(NavigationReferance))
                // NavigationReferance.replace('OnBoardingScreen')
                dispatch(storeAuthData({ access_token: "", userName: "", fullName: "", profile_photo: '', userId: '', photo_count: 0, profile_created: "" }));
                return false
            } else {
                showMessage({ message: response.data.responseMessage })
                return false
            }
        }
    } catch (error) {
        if (error != null) {
            if (error.message === 'Network Error') {
                // This is a network error.
                showMessage({ message: "Network Error" })
            }
        } else {
            showMessage({ message: "Oops, Something Went Wrong" })
            console.log("error" + JSON.stringify(error))
        }
        return false
    }
}

export const get = async (apiName) => {
    const state = store.getState();
    const access_token = state.authSlice.access_token;
    try {
        const header = getHeader(access_token);
        const response = await http.get(configurations.baseUrl + apiName, header)
        if (response.data.responseCode == 200) {
            console.log("success" + JSON.stringify(response))
            return { isSucess: true, data: response.data.responseData }
        } else {
            if (response.data.responseCode == 401) {
                alert('Token Expired.')
                // NavigationReferance.navigate('OnBoardingScreen')
                dispatch(storeAuthData({ access_token: "", userName: "", fullName: "", profile_photo: '', userId: '', photo_count: 0, profile_created: "" }));
                return false
            } else {
                showMessage({ message: response.data.responseMessage })
                console.log("else error" + JSON.stringify(response) + "response.data.responseCode" + response.data.responseCode)
            }
        }
    } catch (error) {
        if (error != null) {
            if (error.message === 'Network Error') {
                // This is a network error.
                showMessage({ message: "Network Error" })
            }
        } else {
            showMessage({ message: "Oops, Something Went Wrong" })
            console.log("error" + JSON.stringify(error))
        }
        return false
    }
}

export const put = async (apiName, requestData) => {
    const state = store.getState();
    const access_token = state.authSlice.access_token;
    try {
        const header = getHeader(access_token);
        const response = await http.put(configurations.baseUrl + apiName, requestData, header)
        console.log("success" + JSON.stringify(response))
        if (response.data.responseCode == 200) {
            console.log("success" + JSON.stringify(response))
            return { isSucess: true, data: response.data.responseData }
        } else {
            if (response.data.responseCode == 401) {
                alert('Token Expired.')
                // NavigationReferance.navigate('OnBoardingScreen')
                dispatch(storeAuthData({ access_token: "", userName: "", fullName: "", profile_photo: '', userId: '', photo_count: 0, profile_created: "" }));
                return false
            } else {
                showMessage({ message: response.data.responseMessage })
                console.log("else error" + JSON.stringify(response) + "response.data.responseCode" + response.data.responseCode)
                return false
            }
        }
    } catch (error) {
        if (error != null) {
            if (error.message === 'Network Error') {
                // This is a network error.
                showMessage({ message: "Network Error" })
            }
        } else {
            showMessage({ message: "Oops, Something Went Wrong" })
            console.log("error" + JSON.stringify(error))
        }
        return false
    }
}

export const deleteApi = async (apiName, requestData) => {
    const state = store.getState();
    const access_token = state.authSlice.access_token;
    try {
        const header = getHeader(access_token);
        const response = await http.delete(configurations.baseUrl + apiName, requestData, header)
        console.log("success" + JSON.stringify(response))
        if (response.data.responseCode == 200) {
            console.log("success" + JSON.stringify(response))
            return { isSucess: true, data: response.data.responseData }
        } else {
            if (response.data.responseCode == 401) {
                alert('Token Expired.')
                // NavigationReferance.navigate('OnBoardingScreen')
                // NavigationReferance.reset({ index: 0, routes: [{ name: 'OnBoardingScreen' },] })
                dispatch(storeAuthData({ access_token: "", userName: "", fullName: "", profile_photo: '', userId: '', photo_count: 0, profile_created: "" }));
                return false
            } else {
                showMessage({ message: response.data.responseMessage })
                return false
            }
        }
    } catch (error) {
        if (error != null) {
            if (error.message === 'Network Error') {
                // This is a network error.
                showMessage({ message: "Network Error" })
            }
        } else {
            showMessage({ message: "Oops, Something Went Wrong" })
            console.log("error" + JSON.stringify(error))
        }
        return false
    }
}

export { apiPath }