import React, {useState} from 'react'
import {routes, routesArray} from './utils/routes'
import {Link, Route, Routes} from 'react-router-dom'
import {AppBar, Box, Button, IconButton, ListItemButton, Toolbar, Typography} from '@mui/material'
import {GitHub, Menu} from '@mui/icons-material'
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Layout() {
    const routeComponents = routesArray.map(({RouteBody, path}) => (
        <Route path={path} key={path} element={<RouteBody/>}/>
    ))

    const isDesktop = useMediaQuery('(min-width:1000px)');

    const [drawer, setDrawer] = useState(false)
    const toggleDrawer = () => setDrawer(!drawer)

    const copyright = () => {
        const start = 2022
        const current = new Date().getFullYear()

        if (start === current) return start
        return `${start}-${current}`
    }

    return (
        <>
            <AppBar position="fixed" sx={{zIndex: theme => theme.zIndex.drawer + 1}} elevation={0}>
                <Toolbar variant="dense">
                    <div hidden={isDesktop}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer}
                        >
                            <Menu/>
                        </IconButton>
                    </div>

                    <Typography sx={{flexGrow: 1}}>
                        <Button color="inherit" component={Link} to={routes.home.path}>
                            TOSCA Orchestrator Selection Support System
                        </Button>
                    </Typography>

                    <div hidden={!isDesktop}>
                        {routesArray
                            .filter(route => !route.hidden)
                            .map(route => (
                                <Button color="inherit" component={Link} to={route.path} key={route.path} id={`nav-button-${route.path.slice(1)}`}>
                                    {route.name}
                                </Button>
                            ))}

                        <Button color="inherit" href="mailto:miles@stoetzner.de">
                            Contact
                        </Button>

                        <IconButton
                            color="inherit"
                            href="https://github.com/OpenTOSCA/opentosca-tosss"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <GitHub/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>

            <Drawer
                open={drawer}
                onClose={toggleDrawer}
            >
                <Box
                    sx={{width: 250}}
                    role="presentation"
                    onClick={toggleDrawer}
                    onKeyDown={toggleDrawer}
                >
                    <Toolbar variant="dense"/>
                    <List>
                        {routesArray
                            .filter(route => !route.hidden)
                            .map(route => (
                                <ListItemButton component={Link} key={route.path} to={route.path}>
                                    <ListItemText primary={route.name}/>
                                </ListItemButton>
                            ))}

                        <ListItemButton component={Button} href="mailto:miles@stoetzner.de">
                            <ListItemText primary="Contact"/>
                        </ListItemButton>

                        <ListItemButton component={Button}
                                        href="https://github.com/OpenTOSCA/opentosca-tosss"
                                        target="_blank"
                                        rel="noreferrer"
                        >
                            <ListItemText primary="GitHub"/>
                        </ListItemButton>
                    </List>
                </Box>

            </Drawer>

            <Toolbar variant="dense"/>

            <Routes>{routeComponents}</Routes>

            <div className="hline"/>
            <Box className="footer">
                <Typography variant="body2" align="center" color="text.secondary" paragraph>

                    <a href="https://www.uni-stuttgart.de/impressum/" target="_blank" rel="noopener">
                        Copyright &copy; {copyright()} University of Stuttgart
                    </a>

                    <br/>

                    Partially funded by the&nbsp;
                    <a href="https://www.bmwk.de/Navigation/EN/Home/home.html" target="_blank"
                       rel="noopener">
                        German Federal Ministry for Economic Affairs and Climate Action (BMWK)
                    </a>

                </Typography>
            </Box>
        </>
    )
}
