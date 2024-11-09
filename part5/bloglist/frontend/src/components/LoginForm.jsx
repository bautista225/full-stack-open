import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ executeUserLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()

        executeUserLogin({
            username, password,
        })

        setUsername('')
        setPassword('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    placeholder='Username'
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    placeholder='Password'
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

LoginForm.propTypes = {
    executeUserLogin: PropTypes.func.isRequired,
}

export default LoginForm