import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/userReducer'
import { useField } from '../hooks/useField'
import { Box, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'

const LoginForm = () => {
    const dispatch = useDispatch()
    const username = useField({ name: 'username' })
    const password = useField({ name: 'password', type: 'password' })
    const [loading, setLoading] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()

        setLoading(true)
        dispatch(
            userLogin({ username: username.value, password: password.value }),
        )

        setLoading(false)
        username.reset()
        password.reset()
    }

    return (
        <Box
            sx={{ display: 'grid', gap: 2 }}
            component="form"
            onSubmit={handleSubmit}
        >
            <TextField
                {...username.textfieldProps()}
                variant="outlined"
                size="small"
                required
            />
            <TextField
                {...password.textfieldProps()}
                variant="outlined"
                size="small"
                required
            />
            <LoadingButton
                type="submit"
                variant="outlined"
                loading={loading}
                loadingIndicator="Logging in..."
            >
                Login
            </LoadingButton>
        </Box>
    )
}

export default LoginForm
