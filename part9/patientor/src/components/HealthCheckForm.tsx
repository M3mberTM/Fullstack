import {HealthCheckRating} from "../types.ts";
import {Select, MenuItem} from "@mui/material";
const HealthCheckForm = () => {

    const ratings = Object.keys(HealthCheckRating).filter((item) => {
        return isNaN(Number(item));
    })
    return <>
        <span>Health Rating: </span>
        <Select size={'small'} name={'rating'} defaultValue={HealthCheckRating.LowRisk} variant={'standard'}>
            {ratings.map((rating) => {
                // @ts-ignore
                return <MenuItem key={rating} value={HealthCheckRating[rating]}>{rating}</MenuItem>
            })}
        </Select>
    </>
};

export default HealthCheckForm;