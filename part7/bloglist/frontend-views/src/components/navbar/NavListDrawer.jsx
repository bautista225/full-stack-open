import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userLogout } from '../../reducers/userReducer'

export const NavListDrawer = ({ navArrayLinks, drawerOnClick }) => {
    const dispatch = useDispatch()
    return (
        <Box sx={{ width: 250 }}>
            <nav>
                <List>
                    {navArrayLinks.map((item) => (
                        <ListItem key={item.title} disablePadding>
                            <ListItemButton
                                component={NavLink}
                                to={item.path}
                                onClick={drawerOnClick}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText>{item.title}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </nav>
            <Divider />
            <nav>
                <List>
                    <ListItem key="Logout" disablePadding>
                        <ListItemButton
                            onClick={() => {
                                drawerOnClick()
                                dispatch(userLogout())
                            }}
                        >
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
        </Box>
    )
}
