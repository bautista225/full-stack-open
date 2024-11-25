import { useField } from '../hooks/useField'
import { useLogin } from '../users/hooks'

const LoginForm = ({ show, setToken, onLogged }) => {
    const username = useField({ name: 'username' })
    const password = useField({ name: 'password', type: 'password' })
    const { login } = useLogin({ setToken })

    if (!show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()

        login({
            username: username.value,
            password: password.value,
        })

        onLogged()

        username.reset()
        password.reset()
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username
                    <input {...username.inputProps()} />
                </div>
                <div>
                    password
                    <input {...password.inputProps()} />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm
