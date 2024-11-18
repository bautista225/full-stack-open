import { useUserValue, useUserDispatch } from '../contexts/UserContext'

const UserInfo = () => {
    const user = useUserValue()
    const userDispatch = useUserDispatch()

    const handleLogout = (event) => {
        event.preventDefault()

        userDispatch({ type: 'REMOVE' })
    }

    return (
        <div>
            {user.name} logged in<button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default UserInfo
