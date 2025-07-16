import {HospitalEntry} from "../../types.ts";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import {Button} from "@mui/material";
import {useState} from "react";

interface HospitalEntryProps {
    entry: HospitalEntry;
    fullDiagnoses: string[];
}
const HospitalEntryInformation = (props: HospitalEntryProps) => {
    const [isFullInfo, setIsFullInfo] = useState<boolean>(false)

    const entryStyle = {
        border: '2px solid green',
        padding: '10px',
        borderRadius: '7px',
        marginBottom: '5px'
    };
    const entry = props.entry;
    const diagnoses = props.fullDiagnoses;
    if (!isFullInfo) {
        return <div style={entryStyle}>
            <LocalHospitalIcon color={'success'}/>
            <strong>{entry.date}</strong><br/>
            <i>{entry.description}</i>
            <p>Diagnosed by {entry.specialist}</p>
            <Button variant={'contained'} size={'small'} onClick={() => setIsFullInfo(true)}>Show full info</Button>
        </div>
    }

    return <div style={entryStyle}>
        <LocalHospitalIcon color={'success'}/>
        <strong>{entry.date}</strong><br/>
        <i>{entry.description}</i><br/>
        {diagnoses.length > 0 &&
            <div>
                <strong>Entries</strong>
                <ul>
                    {diagnoses.map((diagnosis) => {
                        return <li key={diagnosis}>{diagnosis}</li>
                    })}
                </ul>
            </div>
        }
        <strong>Discharge</strong><br/>
        Date: {entry.discharge.date}<br/>
        Criteria: {entry.discharge.criteria}<br/>
        <p>Diagnosed by {entry.specialist}</p>
        <Button variant={'contained'} size={'small'} onClick={() => setIsFullInfo(false)}>Hide full info</Button>
    </div>
};

// @ts-ignore
export default HospitalEntryInformation;