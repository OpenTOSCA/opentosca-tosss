import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {isEmptyObject} from '../utils/utils'
import orchestrators from '../orchestrators'
import {Criterion} from '../framework/models'

export type FilterState = {[category: string]: {[criterion: string]: any}}
export type HiddenState = {[name: string]: boolean}

type FilterSliceState = {
    filter: FilterState
    touched: boolean
    reset: string
    hidden: HiddenState
}

const initialState: FilterSliceState = {
    filter: {},
    touched: false,
    reset: new Date().toISOString(),
    hidden: {},
}

export interface AddFilterPayload {
    criterion: Criterion
    value: any
}

export interface RemoveFilterPayload {
    criterion: Criterion
}

export const filter = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state, {payload}: PayloadAction<AddFilterPayload>) => {
            if (!state.filter[payload.criterion.category.id]) state.filter[payload.criterion.category.id] = {}
            state.filter[payload.criterion.category.id][payload.criterion.id] = payload.value
            state.touched = true
            state.hidden = orchestrators.filter(state.filter)
        },
        resetFilter: (state, {payload}: PayloadAction<RemoveFilterPayload>) => {
            if (!state.filter[payload.criterion.category.id]) return
            delete state.filter[payload.criterion.category.id][payload.criterion.id]

            if (isEmptyObject(state.filter[payload.criterion.category.id]))
                delete state.filter[payload.criterion.category.id]

            if (isEmptyObject(state.filter)) state.touched = false
            state.hidden = orchestrators.filter(state.filter)
        },
        resetAllFilters: state => {
            state.touched = initialState.touched
            state.filter = initialState.filter
            state.reset = new Date().toISOString()
            state.hidden = initialState.hidden
        },
    },
})

export const {setFilter, resetFilter, resetAllFilters} = filter.actions
