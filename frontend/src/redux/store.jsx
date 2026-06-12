import {configureStore} from '@reduxjs/toolkit'
import {authApi} from "./authApi"
import {reportsApi} from "./reportsApi"

export const store = configureStore({
    reducer:{
        [authApi.reducerPath]: authApi.reducer,
        [reportsApi.reducerPath]: reportsApi.reducer

    },
    middleware:(gdm)=>
        gdm().concat(
            authApi.middleware,
            reportsApi.middleware
        )
})  