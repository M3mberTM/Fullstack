import {TextField} from "@mui/material";
const HospitalEntryForm = () => {
    return <>
        <span>Date: </span>
        <TextField variant={'standard'} size={'small'} name={'dischargeDate'} type={'date'}/><br/>
        <TextField variant={'standard'} size={'small'} name={'criteria'} label={'Criteria'}/><br/>
    </>
};

export default HospitalEntryForm;