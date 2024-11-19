import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../reducers/userReducer'
import { Typography } from '@mui/material'

const Menu = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(({ user }) => user)

    const menu_style = {
        backgroundColor: 'gray',
        display: 'flex',
        gap: '10px', // Espaciado entre todos los hijos del div.
        alignItems: 'center', // Alinea los elementos verticalmente en el div.
        padding: '10px',
    }

    const handleLogout = (event) => {
        event.preventDefault()

        dispatch(userLogout())
        navigate('/')
    }

    return (
        <>
            <div style={menu_style}>
                <Link to={'/'}>blogs</Link>
                <Link to={'/users'}>users</Link>
                {user.name} logged in
                <button onClick={handleLogout}>logout</button>
            </div>
            <Typography variant='h2'>blog app</Typography>
        </>
    )
}

export default Menu
