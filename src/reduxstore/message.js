import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { configurations, http, apiPath, getHeader } from '../Api/ApiConfig';

const initialState = {
  isLoading: false,
  error:{},
  isError:false,
  isSuccess:false,
  success:{},
}

export const callApi =  createAsyncThunk(
 'callApi/userLogin',
  async (mobile_number ,{rejectWithValue}) => {
    console.log("Mobile number--"+mobile_number)
  
      const header = getHeader()
      console.log("Header--"+JSON.stringify(header))
      const { data } = await http.post(configurations.baseUrl+apiPath.login,{mobile_number:mobile_number},header)
      console.log("Response from Api", data)
      if (data.responseCode === 200) {
        console.log("Response--" + JSON.stringify(data.title))
        return { ...data }
      }
      else {
        console.log("Response e--" + JSON.stringify(data))
        return rejectWithValue({...data })
      }
  }
)

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [callApi.pending]: (state) => {
      state.isLoading = true
    },
    [callApi.fulfilled]: (state, { payload }) => {
      console.log("Payload", payload);
      state.success = payload;
      state.isLoading = false;
      state.isSuccess = true;
      // state.title = payload.title;
      // console.log("Current State", current(state))
    },
    [callApi.rejected]: (state, { payload }) => {
      console.log("error", payload);
      state.isError = true;
      state.error = payload;
      state.isLoading = false;
      // state.errorMessage = payload.responseMessage
    }
  }
})

export const loginReducer = loginSlice.reducer