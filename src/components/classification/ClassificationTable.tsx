import {FILTER_DRAWER_WIDTH, headerCellStyle} from '../../utils/theme'
import framework from '../../framework'
import {
    Alert,
    Button,
    Card,
    CardMedia,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material'
import {Check, Clear, DoNotDisturb} from '@mui/icons-material'
import React from 'react'
import Copy from '../utils/Copy'
import {resetAllFilters} from '../../store/filter'
import {useStoreDispatch, useStoreSelector} from '../../store/store'
import orchestrators from '../../orchestrators'
import {NOT_APPLICABLE} from '../../orchestrators/types';

export default React.memo(() => {
    const dispatch = useStoreDispatch()

    const hiddenState = useStoreSelector(state => state.filter.hidden)
    const isEmpty = orchestrators.data.length === Object.keys(hiddenState).length

    return (
        <div style={{marginLeft: FILTER_DRAWER_WIDTH}}>
            <Stack spacing={2}>
                <Typography variant="h4">TOSCA Orchestrator Classification</Typography>

                <div hidden={!isEmpty}>
                    <Alert
                        variant="filled"
                        severity="error"
                        action={
                            <Button color="inherit" size="small" onClick={() => dispatch(resetAllFilters())}>
                                Reset
                            </Button>
                        }
                    >
                        There is no orchestrator that matches the selected criteria ...
                    </Alert>
                </div>

                <div hidden={isEmpty}>
                    <Stack spacing={4}>
                        {framework.views.map(view => (
                            <div key={view.id}>
                                <Typography variant="h5">{view.name}</Typography>

                                <Stack spacing={2}>
                                    {view.categories.map(category => (
                                        <div key={category.id}>
                                            <Typography variant="h6" sx={{pb: 1}}>
                                                {category.name}
                                            </Typography>

                                            <Paper variant="outlined">
                                                <TableContainer>
                                                    <Table>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell
                                                                    align="center"
                                                                    key="icon"
                                                                    sx={headerCellStyle}
                                                                    width={25}
                                                                />

                                                                <Tooltip
                                                                    title={
                                                                        framework.views[0].categories[0].criteria[0]
                                                                            .description
                                                                    }
                                                                    key="repository"
                                                                >
                                                                    <TableCell
                                                                        align="center"
                                                                        key="orchestrator"
                                                                        sx={headerCellStyle}
                                                                        width={150}
                                                                    >
                                                                        Orchestrator
                                                                    </TableCell>
                                                                </Tooltip>

                                                                {category.classificationCriteria.map(criterion => (
                                                                    <Tooltip
                                                                        title={criterion.description}
                                                                        key={criterion.id}
                                                                    >
                                                                        <TableCell align="center" sx={headerCellStyle}>
                                                                            {criterion.name}
                                                                        </TableCell>
                                                                    </Tooltip>
                                                                ))}
                                                            </TableRow>
                                                        </TableHead>

                                                        <TableBody>
                                                            {orchestrators.data
                                                                .filter(entry => !hiddenState[entry.data.general.id])
                                                                .map(entry => (
                                                                    <TableRow key={entry.data.general.id}>
                                                                        <TableCell align="center">
                                                                            <Tooltip
                                                                                title={entry.data.general.orchestrator}
                                                                            >
                                                                                <Card
                                                                                    sx={{width: 25}}
                                                                                    variant="outlined"
                                                                                >
                                                                                    <CardMedia
                                                                                        component="img"
                                                                                        alt={entry.data.general.id}
                                                                                        width="25"
                                                                                        image={
                                                                                            process.env.PUBLIC_URL +
                                                                                            '/config/img/' +
                                                                                            entry.data.general.id +
                                                                                            '-icon.png'
                                                                                        }
                                                                                    />
                                                                                </Card>
                                                                            </Tooltip>
                                                                        </TableCell>

                                                                        <TableCell align="center">
                                                                            <Copy
                                                                                value={entry.data.general.orchestrator}
                                                                            >
                                                                                {entry.data.general.orchestrator}
                                                                            </Copy>
                                                                        </TableCell>

                                                                        {category.classificationCriteria.map(
                                                                            criterion => {
                                                                                const value = entry.getValue(criterion)
                                                                                let _value;

                                                                                const notApplicable = value === NOT_APPLICABLE
                                                                                if (notApplicable) _value =
                                                                                    <DoNotDisturb color="action"/>

                                                                                if (criterion.type === 'boolean') {
                                                                                    if (value === true) _value =
                                                                                        <Check color="action"/>
                                                                                    if (value === false) _value =
                                                                                        <Clear color="action"/>

                                                                                    return (
                                                                                        <TableCell
                                                                                            align="center"
                                                                                            key={criterion.id}
                                                                                        >
                                                                                            {_value}
                                                                                        </TableCell>
                                                                                    )
                                                                                }

                                                                                if (
                                                                                    criterion.type === 'strings'
                                                                                ) {
                                                                                    return (
                                                                                        <TableCell
                                                                                            align="center"
                                                                                            sx={{
                                                                                                whiteSpace: 'pre',
                                                                                            }}
                                                                                            key={criterion.id}
                                                                                        >
                                                                                            {!!value.length && (
                                                                                                <Copy
                                                                                                    value={value.join(
                                                                                                        ',\n'
                                                                                                    )}
                                                                                                >
                                                                                                    {value.join(',\n')}
                                                                                                </Copy>
                                                                                            )}

                                                                                            {!value.length && (
                                                                                                <Clear color="action"/>
                                                                                            )}
                                                                                        </TableCell>
                                                                                    )
                                                                                }

                                                                                return (
                                                                                    <TableCell
                                                                                        align="center"
                                                                                        key={criterion.id}
                                                                                    >
                                                                                        <Copy value={value}>
                                                                                            {value}
                                                                                        </Copy>
                                                                                    </TableCell>
                                                                                )
                                                                            }
                                                                        )}
                                                                    </TableRow>
                                                                ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Paper>
                                        </div>
                                    ))}
                                </Stack>
                            </div>
                        ))}
                    </Stack>
                </div>
            </Stack>
        </div>
    )
})
