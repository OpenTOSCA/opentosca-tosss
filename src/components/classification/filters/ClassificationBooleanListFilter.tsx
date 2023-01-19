import {BOOLEAN_FILTER, OPERATION_FILTER} from '../../../orchestrators/types'
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Radio,
    RadioGroup,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material'
import React, {useMemo, useState} from 'react'
import {resetFilter, setFilter} from '../../../store/filter'
import {ClassificationBooleanFilterValue} from './ClassificationBooleanFilter'
import {ClassificationListFilterValues} from './ClassificationListFilter'
import {uniqueValues} from '../../../utils/utils'
import {useStoreDispatch, useStoreSelector} from '../../../store/store'
import {useUpdateEffect} from 'ahooks'
import orchestrators from '../../../orchestrators'
import {Criterion} from '../../../framework/models'

export type ClassificationBooleanListFilterState = {
    boolean: ClassificationBooleanFilterValue
    values: ClassificationListFilterValues
    operation: OPERATION_FILTER
}

export default React.memo(({criterion, size}: {criterion: Criterion, size?: 'small' | 'medium'}) => {
    const reset = useStoreSelector(state => state.filter.reset)
    useUpdateEffect(resetState, [reset])

    const dispatch = useStoreDispatch()

    const choices = useMemo(
        () => uniqueValues(orchestrators.data.map(entry => entry.getValue(criterion)).flat()).sort(),
        []
    )

    const initialBoolean = null
    const initialValues: ClassificationListFilterValues = []
    const initialOperation = OPERATION_FILTER.AND

    const [boolean, _setBoolean] = useState<ClassificationBooleanFilterValue>(initialBoolean)
    const [values, _setValues] = useState<ClassificationListFilterValues>(initialValues)
    const [touched, _setTouched] = useState(false)
    const [operation, _setOperation] = useState<OPERATION_FILTER>(initialOperation)

    function dispatchSetFilter(value: ClassificationBooleanListFilterState) {
        dispatch(setFilter({criterion, value}))
    }

    function setBoolean(value: ClassificationBooleanFilterValue) {
        _setBoolean(value)
        _setValues(initialValues)
        _setOperation(initialOperation)
        _setTouched(true)
        dispatchSetFilter({
            boolean: value,
            values: initialValues,
            operation: initialOperation,
        })
    }

    function setValues(id: string, checked: boolean) {
        const newValues = checked ? [...values, id] : [...values.filter(element => element !== id)]
        _setValues(newValues)
        _setTouched(true)
        dispatchSetFilter({
            boolean,
            values: newValues,
            operation,
        })
    }

    function setOperation(operation: OPERATION_FILTER | null) {
        if (operation === null) return
        _setOperation(operation)
        dispatchSetFilter({
            boolean,
            values,
            operation,
        })
    }

    function resetState() {
        _setTouched(false)
        _setBoolean(initialBoolean)
        _setValues(initialValues)
        _setOperation(initialOperation)
        dispatch(resetFilter({criterion}))
    }

    return (
        <FormGroup>
            <RadioGroup value={boolean} onChange={event => setBoolean(Number(event.target.value))}>
                <FormControlLabel value={BOOLEAN_FILTER.TRUE} control={<Radio size={size} />} label="Yes" />
                <FormControlLabel value={BOOLEAN_FILTER.FALSE} control={<Radio size={size} />} label="No" />
            </RadioGroup>

            {boolean === BOOLEAN_FILTER.TRUE &&
                choices.map((version: string) => (
                    <FormControlLabel
                        onChange={(event, value) => setValues(version, value)}
                        control={<Checkbox size={size} />}
                        key={version}
                        label={version}
                    />
                ))}

            <div hidden={!touched}>
                <Stack spacing={1}>
                    <div hidden={boolean !== BOOLEAN_FILTER.TRUE}>
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
                    </div>

                    <Button onClick={resetState} size={size} variant="contained" disableElevation fullWidth>
                        Reset
                    </Button>
                </Stack>
            </div>
        </FormGroup>
    )
})
