import {Box, Card, CardActionArea, CardMedia, Tooltip} from '@mui/material'
import React from 'react'
import {Orchestrator} from '../../orchestrators/models'
import {theme} from '../../utils/theme';

export default function OrchestratorCard({orchestrator, disabled}: { orchestrator: Orchestrator; disabled?: boolean }) {
    return (
        <Card sx={{width: 200, bgcolor: disabled ? theme.palette.grey[100] : undefined}} variant="outlined">
            <CardActionArea
                disabled={disabled}
                onClick={() => window.open(orchestrator.data.general.website, '_blank', 'noopener,noreferrer')}
            >
                <Tooltip title="Open Website">
                    <Box sx={{padding: '16px'}}>
                        <CardMedia
                            component="img"
                            alt={orchestrator.data.general.id}
                            width="200"
                            image={
                                process.env.PUBLIC_URL +
                                '/config/img/' +
                                orchestrator.data.general.id +
                                '-logo.png'
                            }
                        />
                    </Box>
                </Tooltip>
            </CardActionArea>
        </Card>
    )
}
