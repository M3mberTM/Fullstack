import {useDispatch} from 'react-redux'
import {createFilter} from "../reducers/filterReducer.js";

const Filter = () => {

    const dispatch = useDispatch()
    const handleChange = (event) => {
        // input-field value is in variable event.target.value
        dispatch(createFilter(event.target.value))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange}/>
        </div>
    )
}

export default Filter