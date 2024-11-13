import { useNotificationValue } from '../reducers/notificationReducer'

const Notification = () => {
    const notification = useNotificationValue()

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={style}>
            {notification}
        </div>
    )
}

export default Notification
