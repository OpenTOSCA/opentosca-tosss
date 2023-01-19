import React, {useEffect} from 'react'
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from '@mui/material'
import {useStoreDispatch, useStoreSelector} from '../store/store'
import {resetAllFilters} from '../store/filter'

import framework from '../framework'
import orchestrators from '../orchestrators'
import OrchestratorCard from './utils/OrchestratorCard'
import ClassificationFilter from './classification/ClassificationFilter'
import {OPERATION_FILTER} from '../orchestrators/types';
import {useLocation} from 'react-router-dom';
import {theme} from '../utils/theme';

export default function Questionnaire() {
    const dispatch = useStoreDispatch()

    // Reset scroll
    // https://v5.reactrouter.com/web/guides/scroll-restoration
    const {pathname} = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    // Reset filters
    useEffect(() => {
        dispatch(resetAllFilters())
    }, [])

    const touched = useStoreSelector(state => state.filter.touched)
    const hiddenState = useStoreSelector(state => state.filter.hidden)
    const isEmpty = orchestrators.data.length === Object.keys(hiddenState).length

    const criteria = framework.views[0].questionnaireCriteria
    const [step, setStep] = React.useState(0)

    return (
        <Box>
            <Box sx={{bgcolor: theme.palette.grey[100]}}>
                <Container maxWidth="xs" sx={{pt: 8, pb: 8}}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Questionnaire
                    </Typography>
                    <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{pb: 4}}>
                        The following questions will guide you through the process of selecting an orchestrator
                        using
                        business related criteria.
                    </Typography>

                    <Stack spacing={2}>

                        <Card elevation={0} variant="outlined">
                            <CardContent>
                                <Stack spacing={2}>
                                    <ToggleButtonGroup
                                        exclusive
                                        onChange={(event, value) => setStep(step + value)}
                                        aria-label="text alignment"
                                        size="small"
                                        fullWidth
                                    >
                                        <ToggleButton disabled={step === 0} value={-1} aria-label="left aligned">
                                            Back
                                        </ToggleButton>
                                        <ToggleButton selected disabled value={OPERATION_FILTER.OR}
                                                      aria-label="right center">
                                            {step + 1} / {criteria.length}
                                        </ToggleButton>
                                        <ToggleButton disabled={step + 1 === criteria.length} value={+1}
                                                      aria-label="right aligned">
                                            Next
                                        </ToggleButton>
                                    </ToggleButtonGroup>

                                    <Button disabled={!touched} variant="contained" disableElevation
                                            onClick={() => {
                                                dispatch(resetAllFilters())
                                                setStep(0)
                                            }}>
                                        Reset all Answers
                                    </Button>
                                </Stack>

                            </CardContent>
                        </Card>

                        <Card elevation={0} variant="outlined">
                            <CardContent>
                                <Stack spacing={2}>
                                    <div>
                                        {criteria.map((criterion, index) => (
                                            <div key={criterion.id} hidden={index !== step}>
                                                <Typography gutterBottom variant="h6">{criterion.name}</Typography>
                                                <Typography sx={{pb: 2}}
                                                            color="text.secondary">{criterion.description}</Typography>
                                                <ClassificationFilter criterion={criterion} size="medium"/>
                                            </div>
                                        ))}
                                    </div>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>
                </Container>
            </Box>

            <div className="hline"/>

            <Box>
                <Container maxWidth="xs" sx={{pt: 8}}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Orchestrators
                    </Typography>
                    <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{pb: 4}}>
                        Orchestrators that are not greyed out satisfy your selection.
                        You can further explorer them by either visiting their website or by taking a look at the
                        classification table.
                    </Typography>
                </Container>

                <Container maxWidth="md" sx={{pb: 8}}>
                    <Grid container spacing={2} justifyContent="center" hidden={isEmpty}>
                        {orchestrators.data
                            .map(entry => (
                                <Grid item key={entry.data.general.id}>
                                    <OrchestratorCard orchestrator={entry}
                                                      disabled={hiddenState[entry.data.general.id]}/>
                                </Grid>
                            ))}
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}
