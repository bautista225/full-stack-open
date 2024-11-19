import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton,
    Toolbar,
    Typography,
} from '@mui/material'
import { NavListDrawer } from './NavListDrawer'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userLogout } from '../../reducers/userReducer'

export const NavBar = ({ navArrayLinks }) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        size="large"
                        onClick={() => setOpen(true)}
                        sx={{ display: { xs: 'flex', sm: 'none' } }}
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography sx={{ flexGrow: 1 }}>Blog App</Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navArrayLinks.map((item) => (
                            <Button
                                color="inherit"
                                size="large"
                                key={item.title}
                                component={NavLink}
                                to={item.path}
                            >
                                {item.title}
                            </Button>
                        ))}

                        <Button
                            color="inherit"
                            size="large"
                            key="Logout"
                            onClick={() => dispatch(userLogout())}
                        >
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                open={open}
                anchor="left"
                onClose={() => setOpen(false)}
                sx={{ display: { xs: 'flex', sm: 'none' } }}
            >
                <NavListDrawer
                    navArrayLinks={navArrayLinks}
                    drawerOnClick={() => setOpen(false)}
                />
            </Drawer>
        </>
    )
}
