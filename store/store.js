import {configureStore} from "@reduxjs/toolkit";
import {portfolioApi} from './features/portfolioApi';
import authReducer from './features/authSlice';

export const store = configureStore({
reducer: {
auth:authReducer,
[portfolioApi.reducerPath]: portfolioApi.reducer,


}
,middleware: (getOrDefault)=> getOrDefault().concat(portfolioApi.middleware)




})