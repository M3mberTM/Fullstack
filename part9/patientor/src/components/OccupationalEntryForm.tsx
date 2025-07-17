import {TextField, Switch} from "@mui/material";
import {useState} from "react";

const OccupationalEntryForm = () => {

    const [showSick, setShowSick] = useState<boolean>(false);

    return <>
        <TextField size={'small'} variant={'standard'} label={'Employer name'} name={'employerName'}></TextField>
        <p>Sick leave? <Switch checked={showSick} onChange={() => setShowSick(!showSick)} size={'small'} name={'wasSick'}/></p>
        {showSick &&
            <div>
                <span>Start: <TextField variant={'standard'} size={'small'} name={'sickStart'} type={'date'}/></span><br/>
                <span>End: <TextField variant={'standard'} size={'small'} name={'sickEnd'} type={'date'}/></span><br/>
            </div>
        }
    </>
};

export default OccupationalEntryForm;