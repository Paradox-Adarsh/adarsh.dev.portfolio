import {createSlice} from '@reduxjs/toolkit';
import { portfolioApi } from './portfolioApi';

const initialState={
    token:typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    isAuthenticated:false,

}
 const authSlice=createSlice({
    name: 'auth',
    initialState,
    reducers:{
        logout:(state)=>{
            state.token=null
            state.isAuthenticated=false
            localStorage.removeItem('portfolio_token')

        }
    },

    extraReducers: (builder) => {
        builder
            .addMatcher(
                portfolioApi.endpoints.login.matchFulfilled,
                (state, action) => {
                    state.token = action.payload.token
                    state.isAuthenticated = true
                    localStorage.setItem('portfolio_token', action.payload.token)
                }
            )
            .addMatcher(
                portfolioApi.endpoints.login.matchRejected,
                (state) => {
                    state.token = null
                    state.isAuthenticated = false
                }
            )
    }

 })

 export const { logout } = authSlice.actions
 export const selectToken = (state) => state.auth.token
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export default authSlice.reducer;