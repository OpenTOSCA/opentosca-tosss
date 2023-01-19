import {OPERATION_FILTER} from '../../../orchestrators/types'
import {Button, Checkbox, FormControlLabel, FormGroup, Stack, ToggleButton, ToggleButtonGroup,} from '@mui/material'
import React, {useMemo, useState} from 'react'
import {resetFilter, setFilter} from '../../../store/filter'
import {uniqueValues} from '../../../utils/utils'
import {useStoreDispatch, useStoreSelector} from '../../../store/store'
import {useUpdateEffect} from 'ahooks'
import orchestrators from '../../../orchestrators'
import {Criterion} from '../../../framework/models'

export type ClassificationListFilterValues = string[]
export type ClassificationListFilterState = {
    values: ClassificationListFilterValues
    operation: OPERATION_FILTER
}

export default React.memo(({criterion, size}: { criterion: Criterion, size?: 'small' | 'medium' }) => {
    const reset = useStoreSelector(state => state.filter.reset)
    useUpdateEffect(resetState, [reset])

    const dispatch = useStoreDispatch()

    const choices = useMemo(
        () => uniqueValues(orchestrators.data.map(entry => entry.getValue(criterion)).flat()).sort(),
        []
    )

    const initialValues: ClassificationListFilterValues = []
    const initialOperation = OPERATION_FILTER.AND
    const [values, _setValues] = useState<ClassificationListFilterValues>(initialValues)
    const [touched, _setTouched] = useState(false)
    const [operation, _setOperation] = useState<OPERATION_FILTER>(initialOperation)

    function dispatchSetFilter(value: ClassificationListFilterState) {
        dispatch(
            setFilter({
                criterion,
                value,
            })
        )
    }

    function setValue(id: string, checked: boolean) {
        const newValues = checked ? [...values, id] : [...values.filter(element => element !== id)]
        if (!newValues.length) return resetState()

        _setValues(newValues)
        _setTouched(true)
        dispatchSetFilter({
            values: newValues,
            operation,
        })
    }

    function setOperation(operation: OPERATION_FILTER | null) {
        if (operation === null) return
        _setOperation(operation)
        dispatchSetFilter({
            values,
            operation,
        })
    }

    function resetState() {
        _setTouched(false)
        _setValues(initialValues)
        _setOperation(initialOperation)
        dispatch(resetFilter({criterion}))
    }

    return (
        <FormGroup>
            {choices.map((id: string) => (
                <FormControlLabel
                    onChange={(event, checked) => setValue(id, checked)}
                    control={<Checkbox checked={values.includes(id)} size="small"/>}
                    key={id}
                    label={id}
                />
            ))}

            <div hidden={!touched}>
                <Stack spacing={1}>
                    <ToggleButtonGroup
                        value={operation}
                        exclusive
                        onChange={(event, value) => setOperation(value)}
                        aria-label="text alignment"
                        size="small"
                        fullWidth
                    >
                        <ToggleButton value={OPERATION_FILTER.AND} aria-label="left aligned">
                            AND
                        </ToggleButton>
                        <ToggleButton value={OPERATION_FILTER.OR} aria-label="right center">
                            OR
                        </ToggleButton>
                        <ToggleButton value={OPERATION_FILTER.NOT} aria-label="right aligned">
                            NOT
                        </ToggleButton>
                    </ToggleButtonGroup>

                    <Button onClick={resetState} size={size} variant="contained" disableElevation fullWidth>
                        Reset
                    </Button>
                </Stack>
            </div>
        </FormGroup>
    )
})
