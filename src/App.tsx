import React from 'react'
import './App.css'
import {BrowserRouter} from 'react-router-dom'
import Layout from './Layout'
import {ThemeProvider} from '@mui/material'
import {theme} from './utils/theme'
import {Provider as StoreProvider} from 'react-redux'
import {store} from './store/store'

function App() {
    return (
        <StoreProvider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <Layout/>
                </BrowserRouter>
            </ThemeProvider>
        </StoreProvider>
    )
}

export default App
