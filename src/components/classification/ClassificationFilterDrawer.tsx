import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    CardContent,
    Divider,
    Drawer,
    Stack, Toolbar,
    Typography,
} from '@mui/material'
import {FILTER_DRAWER_WIDTH} from '../../utils/theme'
import framework from '../../framework'
import {ExpandMore} from '@mui/icons-material'
import React from 'react'
import {useStoreDispatch, useStoreSelector} from '../../store/store'
import {resetAllFilters} from '../../store/filter'
import ClassificationFilter from './ClassificationFilter'

const FilterResetComponent = React.memo(() => {
    const touched = useStoreSelector(state => state.filter.touched)
    const dispatch = useStoreDispatch()
    return (
        <Button
            onClick={() => dispatch(resetAllFilters())}
            size="small"
            variant="contained"
            disableElevation
            fullWidth
            disabled={!touched}
        >
            Reset
        </Button>
    )
})

export default React.memo(() => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: FILTER_DRAWER_WIDTH,
                flexShrink: 0,
                ['& .MuiDrawer-paper']: {
                    width: FILTER_DRAWER_WIDTH,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Toolbar variant="dense"/>

            <Box sx={{overflowY: 'auto', overflowX: 'hidden'}}>
                <CardContent>
                    <Stack spacing={1}>
                        <Typography variant="h6">Filters</Typography>

                        <FilterResetComponent />
                    </Stack>
                </CardContent>

                {framework.categories.map(category => (
                    <Accordion disableGutters elevation={0} square sx={{borderRight: 0}} key={category.id}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography> {category.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {category.filterCriteria.map((criterion, index) => (
                                <React.Fragment key={criterion.id}>
                                    {index !== 0 && (
                                        <>
                                            <br />
                                            <Divider />
                                            <br />
                                        </>
                                    )}
                                    <Typography gutterBottom>{criterion.name}</Typography>
                                    <ClassificationFilter criterion={criterion} size="small" />
                                </React.Fragment>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </Drawer>
    )
})
