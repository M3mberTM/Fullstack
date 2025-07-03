const Notification = ({ text, isError }) => {
    const notifStyle = {
        borderStyle: 'solid',
        borderWidth: 4,
        textAlign: 'center',
        borderRadius: 5,
        backgroundColor: 'rgba(0, 128, 0, 0.3)',
        borderColor: 'green',
        height: 50,
        color: 'green',
        fontSize: 30,
        paddingTop: 15,
    }

    const errorStyle = {
        borderStyle: 'solid',
        borderWidth: 4,
        textAlign: 'center',
        borderRadius: 5,
        backgroundColor: 'rgba(245,6,6,0.3)',
        borderColor: 'red',
        height: 50,
        color: 'red',
        fontSize: 30,
        paddingTop: 15,
    }

    return (
        <div
            id={'notification'}
            style={isError === true ? errorStyle : notifStyle}>
            {text}
        </div>
    )
}

export default Notification
