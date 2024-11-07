const UserInfo = ({ name, executeUserLogout }) => {

    const handleLogout = (event) => {
        event.preventDefault()

        executeUserLogout()
    }

    return (
        <div>
            {name} logged in<button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default UserInfo