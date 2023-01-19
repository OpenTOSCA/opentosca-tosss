import React, {useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import {Box} from '@mui/material'
import {scroller} from 'react-scroll'

export default function RouteContainer({path, children}: { path: string; children: React.ReactNode }) {
    const {pathname} = useLocation()
    useEffect(() => {
        scroller.scrollTo(pathname, {offset: -49})
    }, [pathname])

    return (
        <Box id={path}>
            {children}
        </Box>
    )
}
