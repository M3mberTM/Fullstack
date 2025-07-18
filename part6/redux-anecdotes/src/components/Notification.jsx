import {useSelector} from 'react-redux'

const Notification = () => {

    const notification = useSelector(({anecdotes, filter, notification}) => {
        return notification
    })
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    if (notification.length > 0) {
        return (
            <div style={style}>
                {notification}
            </div>
        )
    }
    return <div></div>
}

export default Notification