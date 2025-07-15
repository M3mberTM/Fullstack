
interface TotalProps {
    total: number
}
const Total = (props: TotalProps) => {

    return (
        <div>
            <h2>Total</h2>
            <p>Number of exercises {props.total}</p>
        </div>
    )
};

export default Total;