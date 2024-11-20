import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { initializeUsers } from '../reducers/usersReducer'
import {
    Box,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
} from '@mui/material'

const UsersInfo = () => {
    const dispatch = useDispatch()
    const { users } = useSelector((state) => ({ users: state.users }))

    return (
        <Box>
            <Typography component='h2' variant='h5' gutterBottom>
                Users
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Blogs created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell>
                                    <Link to={`/users/${user.id}`}>
                                        {user.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{user.blogs.length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default UsersInfo
