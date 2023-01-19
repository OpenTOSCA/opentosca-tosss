import {createTheme} from '@mui/material/styles'

const defaultTheme = createTheme()

export const theme = createTheme({
    palette: {
        primary: defaultTheme.palette.secondary,
    },
    typography: {
        fontSize: 12,
        button: {
            textTransform: 'unset',
        },
    },
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {fontSize: 11},
            },
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    border: `1px solid ${defaultTheme.palette.divider}`,
                    '&:not(:last-child)': {
                        borderBottom: 0,
                    },
                    '&:before': {
                        display: 'none',
                    },
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:nth-of-type(even)': {
                        backgroundColor: defaultTheme.palette.grey[100],
                    },
                    '&:last-child td, &:last-child th': {
                        border: 0,
                    },
                },
            },
        },
    },
})

export const headerCellStyle = {
    backgroundColor: defaultTheme.palette.grey[800],
    color: 'white',
    '&:first-of-type': {
        borderTopLeftRadius: '4px',
    },
    '&:last-child': {
        borderTopRightRadius: '4px',
    },
}

export const FILTER_DRAWER_WIDTH = 250
