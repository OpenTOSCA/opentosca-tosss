import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {filter} from './filter'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'

export const store = configureStore({
    reducer: {
        filter: filter.reducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type StoreDispatch = typeof store.dispatch

export const useStoreDispatch = () => useDispatch<StoreDispatch>()
export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector
