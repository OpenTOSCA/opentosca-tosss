import React from 'react'
import {Box, Container, Typography} from '@mui/material'

export default function PageNotFoundError() {
    return (
        <Box>
            <Container maxWidth="sm" sx={{pt: 8, pb: 8}}>
                <Typography variant="h4" align="center" gutterBottom>
                    Error
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" paragraph>
                    Page "{window.location.href}" not found ...
                </Typography>
            </Container>
        </Box>
    )
}
