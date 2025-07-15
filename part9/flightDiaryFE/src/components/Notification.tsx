
interface NotificationProps {
    message: string;
}
const Notification = (props: NotificationProps) => {

    if (props.message.length < 1) {
        return null;
    }
    return (<div style={{color: 'red', border: '2px solid red'}}>
        {props.message}
    </div>);
};

export default Notification;