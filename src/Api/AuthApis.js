import { configurations, http, apiPath, getHeader } from '../Api/ApiConfig';
import { showMessage } from "react-native-flash-message";
export const apiCalling = async (apiName, requestData, access_token) => {
    console.log("Requestdata--" + JSON.stringify(requestData))
    try {
        const header = getHeader(access_token);
        const response = await http.post(configurations.baseUrl + apiName, requestData, header)
        if (response.data.responseCode == 200) {
            console.log("success" + JSON.stringify(response))
            return { isSucess: true, data: response.data.responseData }
        } else {
            showMessage({ message: "error", type: "error" })
            console.log("else error" + JSON.stringify(response)+"response.data.responseCode"+response.data.responseCode)
            return false
        }
    } catch (error) {
        showMessage({ message: "error", type: "error", })
        console.log("error" + JSON.stringify(error))
        return false
    }

}
export { apiPath }