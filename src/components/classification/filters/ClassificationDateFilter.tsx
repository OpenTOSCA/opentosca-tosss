import React, {useState} from 'react'
import {Button, FormGroup, Stack, TextField} from '@mui/material'
import {DatePicker, LocalizationProvider} from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import {resetFilter, setFilter} from '../../../store/filter'
import {useStoreDispatch, useStoreSelector} from '../../../store/store'
import {useUpdateEffect} from 'ahooks'
import {Criterion} from '../../../framework/models'

export type ClassificationDateFilterValue = (Date | null)[]
export type ClassificationDateFilterState = ClassificationDateFilterValue

export default React.memo(({criterion, size}: {criterion: Criterion, size?: 'small' | 'medium'}) => {
    const reset = useStoreSelector(state => state.filter.reset)
    useUpdateEffect(resetState, [reset])

    const dispatch = useStoreDispatch()

    const initial = [null, null]
    const [state, _setState] = useState<ClassificationDateFilterValue>(initial)
    const [touched, _setTouched] = useState(false)

    function setState(value: ClassificationDateFilterValue) {
        _setState(value)
        _setTouched(!!value[0] || !!value[1])
        dispatch(
            setFilter({
                criterion,
                value: [value[0]?.toDateString(), value[1]?.toDateString()],
            })
        )
    }

    function resetState() {
        _setState(initial)
        _setTouched(false)
        dispatch(resetFilter({criterion}))
    }

    return (
        <FormGroup>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={1}>
                    <DatePicker
                        label="From"
                        value={state[0]}
                        onChange={value => setState([value, state[1]])}
                        renderInput={params => <TextField {...params} size="small" />}
                    />

                    <DatePicker
                        label="Until"
                        value={state[1]}
                        onChange={value => setState([state[0], value])}
                        renderInput={params => <TextField {...params} size="small" />}
                    />
                </Stack>
            </LocalizationProvider>

            <div hidden={!touched}>
                <Button onClick={resetState} size={size} variant="contained" disableElevation sx={{mt: 1}} fullWidth>
                    Reset
                </Button>
            </div>
        </FormGroup>
    )
})
