import {Button, FormGroup, Slider} from '@mui/material'
import React, {useMemo, useState} from 'react'
import {resetFilter, setFilter} from '../../../store/filter'
import {useStoreDispatch, useStoreSelector} from '../../../store/store'
import {useUpdateEffect} from 'ahooks'
import orchestrators from '../../../orchestrators'
import {Criterion} from '../../../framework/models'

export type ClassificationNumberFilterValue = number[]
export type ClassificationNumberFilterState = ClassificationNumberFilterValue

export default React.memo(({criterion, size}: {criterion: Criterion, size?: 'small' | 'medium'}) => {
    const reset = useStoreSelector(state => state.filter.reset)
    useUpdateEffect(resetState, [reset])

    const dispatch = useStoreDispatch()

    const min = useMemo(() => Math.min(...orchestrators.data.map(entry => entry.getValue(criterion))), [])
    const max = useMemo(() => Math.max(...orchestrators.data.map(entry => entry.getValue(criterion))), [])
    const initial = [min, max]

    const [value, _setValue] = useState<ClassificationNumberFilterValue>(initial)
    const [touched, _setTouched] = useState(false)

    function setValue(value: ClassificationNumberFilterValue) {
        _setValue(value)
    }

    function setCommit(value: ClassificationNumberFilterValue) {
        _setTouched(true)
        dispatch(setFilter({criterion, value}))
    }

    function resetState() {
        _setValue(initial)
        _setTouched(false)
        dispatch(resetFilter({criterion}))
    }

    return (
        <FormGroup>
            <Slider
                size="small"
                min={0}
                max={max}
                value={value}
                onChange={(event, value) => setValue(value as ClassificationNumberFilterValue)}
                onChangeCommitted={(event, value) => setCommit(value as ClassificationNumberFilterValue)}
                valueLabelDisplay="on"
                disableSwap
            />

            <div hidden={!touched}>
                <Button onClick={resetState} size={size} variant="contained" disableElevation fullWidth>
                    Reset
                </Button>
            </div>
        </FormGroup>
    )
})
