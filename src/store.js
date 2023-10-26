import {configureStore,createSlice} from "@reduxjs/toolkit"

const initialState = {value:{access_token:''}}

const tokenSlice = createSlice({
    name:"getToken",
    initialState:initialState,
    reducers:{
        getAccessToken:(state)=>{
       
            const accessToken = localStorage.getItem('access_token');
            state.value = {'access_token':accessToken}

        },
        setAccessToken:(state,action)=>{
            localStorage.setItem("access_token",action.payload)
            const accessToken = localStorage.getItem('access_token');
            state.value = {'access_token':accessToken}
        },
        resetAccessToken:(state)=>{
            localStorage.clear()
            state=initialState
        }
        
    }

})

export const store = configureStore({
    reducer:{
        getToken:tokenSlice.reducer
    }
})

export const {getAccessToken,setAccessToken,resetAccessToken} = tokenSlice.actions;