import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../reducers/userReducer'

const UserInfo = () => {
    const dispatch = useDispatch()
    const user = useSelector(({ user }) => user)

    const handleLogout = (event) => {
        event.preventDefault()

        dispatch(userLogout())
    }

    return (
        <div>
            {user.name} logged in<button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default UserInfo
