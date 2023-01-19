import {Button, FormControlLabel, FormGroup, Radio, RadioGroup} from '@mui/material'
import React, {useState} from 'react'
import {resetFilter, setFilter} from '../../../store/filter'
import {useStoreDispatch, useStoreSelector} from '../../../store/store'
import {useUpdateEffect} from 'ahooks'
import {Criterion} from '../../../framework/models'
import {BOOLEAN_FILTER} from '../../../orchestrators/types'

export type ClassificationBooleanFilterValue = number | null
export type ClassificationBooleanFilterState = ClassificationBooleanFilterValue

export default React.memo(({
                               criterion,
                               size}: { criterion: Criterion, size?: 'small' | 'medium' }) => {
    const reset = useStoreSelector(state => state.filter.reset)
    useUpdateEffect(resetState, [reset])

    const dispatch = useStoreDispatch()

    const initial = null
    const [state, _setState] = useState<ClassificationBooleanFilterValue>(initial)
    const [touched, _setTouched] = useState(false)

    function setState(value: BOOLEAN_FILTER) {
        _setState(value)
        _setTouched(true)
        dispatch(setFilter({criterion, value}))
    }

    function resetState() {
        _setState(initial)
        _setTouched(false)
        dispatch(resetFilter({criterion}))
    }

    return (
        <FormGroup>
            <RadioGroup value={state} onChange={event => setState(Number(event.target.value))}>
                <FormControlLabel value={BOOLEAN_FILTER.TRUE} control={<Radio size="small"/>} label="Yes"/>

                <FormControlLabel value={BOOLEAN_FILTER.FALSE} control={<Radio size="small"/>} label="No"/>
            </RadioGroup>

            <div hidden={!touched}>
                <Button onClick={resetState} size={size} variant="contained" disableElevation fullWidth>
                    Reset
                </Button>
            </div>
        </FormGroup>
    )
})
