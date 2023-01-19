import React, {useEffect} from 'react'
import ClassificationFilterDrawer from './classification/ClassificationFilterDrawer'
import ClassificationTable from './classification/ClassificationTable'
import {Box} from '@mui/material'
import {useLocation} from 'react-router-dom'
import {useStoreDispatch} from '../store/store'
import {resetAllFilters} from '../store/filter'

export default function Classification() {
    // Reset scroll
    // https://v5.reactrouter.com/web/guides/scroll-restoration
    const {pathname} = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    // Reset filters
    const dispatch = useStoreDispatch()
    useEffect(() => {
        dispatch(resetAllFilters())
    }, [])

    return (
        <Box sx={{padding: '1rem', minHeight: '100vh'}}>
            <ClassificationFilterDrawer/>
            <ClassificationTable/>
        </Box>
    )
}
