import React from 'react'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Container,
    Grid,
    Stack,
    Typography
} from '@mui/material'
import {Link} from 'react-router-dom'
import routes from '../utils/routes'
import OrchestratorCard from './utils/OrchestratorCard'
import {theme} from '../utils/theme'
import {downloadCSV, downloadJSON, downloadYAML} from '../utils/utils'
import RouteContainer from './utils/RouteContainer'
import orchestrators from '../orchestrators'
import framework from '../framework';
import {ExpandMore} from '@mui/icons-material';

export default function Home() {
    return (
        <Box>
            <RouteContainer path={routes.home.path}>
                <Box>
                    <Container maxWidth="sm" sx={{pt: 8, pb: 8}}>

                        <Stack spacing={4} justifyContent="center">

                            <div className="tosss">TOSSS</div>

                            <Typography variant="h4" align="center">
                                TOSCA Orchestrator
                                <br/>
                                Selection Support System
                            </Typography>

                            <Typography variant="h6" align="center" color="text.secondary" paragraph>
                                The <i>TOSCA Orchestrator Selection Support System</i> (TOSSS) helps you to identify which
                                TOSCA orchestrator is the best for you.
                                Depending on your technical expertise you should either use the questionnaire or the
                                classification table.
                                While the questionnaire guides you through business related criteria the classification
                                table contains technical information.
                                For details take a look at our framework.
                            </Typography>

                            <Stack direction="row" spacing={2} justifyContent="center">
                                <Button
                                    variant="contained"
                                    component={Link}
                                    disableElevation
                                    to={routes.questionnaire.path}
                                >
                                    {routes.questionnaire.name}
                                </Button>

                                <Button
                                    variant="contained"
                                    component={Link}
                                    disableElevation
                                    to={routes.classification.path}
                                >
                                    {routes.classification.name}
                                </Button>

                                <Button variant="contained" component={Link} disableElevation
                                        to={routes.framework.path}>
                                    {routes.framework.name}
                                </Button>
                            </Stack>
                        </Stack>
                    </Container>
                </Box>
            </RouteContainer>

            <div className="hline"/>

            <RouteContainer path={routes.orchestrators.path}>
                <Box sx={{bgcolor: theme.palette.grey[100]}}>
                    <Container maxWidth="md" sx={{pt: 8, pb: 8}}>
                        <Typography variant="h4" align="center" gutterBottom>
                            Orchestrators
                        </Typography>
                        <Typography variant="h6" align="center" color="text.secondary" paragraph>
                            We have reviewed the following orchestrators.
                        </Typography>

                        <Grid container spacing={2} justifyContent="center" sx={{pt: 4}}>
                            {orchestrators.data.map(entry => (
                                <Grid item key={entry.data.general.id}>
                                    <OrchestratorCard orchestrator={entry}/>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            </RouteContainer>

            <div className="hline"/>

            <RouteContainer path={routes.framework.path}>
                <Box>
                    <Container maxWidth="sm" sx={{pt: 8, pb: 8}}>
                        <Typography variant="h4" align="center" gutterBottom>
                            Framework
                        </Typography>
                        <Typography variant="h6" align="center" color="text.secondary" paragraph>
                            The framework describes the criteria that we extracted about each orchestrator.
                        </Typography>

                        <Box sx={{pt: 4}}>
                            <Stack spacing={4}>
                                {framework.views.map(view => (
                                    <div key={view.id} id={view.id}>
                                        <Typography variant="h5" align="center">{view.name}</Typography>

                                        <Stack spacing={2}>
                                            {view.categories.map(category => (
                                                <div key={category.id} id={category.id}>

                                                    <Typography variant="h6" align="center" color="text.secondary"
                                                                paragraph>
                                                        {category.name} Category
                                                    </Typography>

                                                    <div>
                                                        {category.frameworkCriteria.map(criterion => (
                                                            <Accordion
                                                                disableGutters
                                                                elevation={0}
                                                                key={criterion.id}
                                                                id={criterion.id}
                                                            >
                                                                <AccordionSummary
                                                                    expandIcon={<ExpandMore/>}
                                                                    aria-controls="panel1a-content"
                                                                    id="panel1a-header"
                                                                >
                                                                    <Typography> {criterion.name} </Typography>
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    <Typography>{criterion.description}</Typography>
                                                                </AccordionDetails>
                                                            </Accordion>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </Stack>
                                    </div>
                                ))}
                            </Stack>
                        </Box>
                    </Container>
                </Box>
            </RouteContainer>

            <div className="hline"/>

            <RouteContainer path={routes.data.path}>
                <Box sx={{bgcolor: theme.palette.grey[100]}}>
                    <Container maxWidth="sm" sx={{pt: 8, pb: 8}}>
                        <Typography variant="h4" align="center" gutterBottom>
                            Downloads
                        </Typography>
                        <Typography variant="h6" align="center" color="text.secondary" paragraph>
                            You can download the raw data and run your own evaluation.
                        </Typography>
                        <Stack direction="row" spacing={2} justifyContent="center">
                            <Button
                                onClick={() => downloadYAML('tosca-orchestrator-classification.yaml', orchestrators.json)}
                                variant="contained"
                                disableElevation
                            >
                                YAML
                            </Button>

                            <Button
                                onClick={() => downloadJSON('tosca-orchestrator-classification.json', orchestrators.json)}
                                variant="contained"
                                disableElevation
                            >
                                JSON
                            </Button>

                            <Button
                                onClick={() => downloadCSV('tosca-orchestrator-classification.csv', orchestrators.csv)}
                                variant="contained"
                                disableElevation
                            >
                                CSV
                            </Button>
                        </Stack>
                    </Container>
                </Box>
            </RouteContainer>
        </Box>
    )
}
