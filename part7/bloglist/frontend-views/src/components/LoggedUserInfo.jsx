import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../reducers/userReducer'

const LoggedUserInfo = () => {
    const dispatch = useDispatch()
    const user = useSelector(({ user }) => user)

    const handleLogout = (event) => {
        event.preventDefault()

        dispatch(userLogout())
    }

    return (
        <div>
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default LoggedUserInfo
