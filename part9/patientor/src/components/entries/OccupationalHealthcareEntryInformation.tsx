import {OccupationalHealthcareEntry} from "../../types.ts";
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import {Button} from "@mui/material";
import {useState} from "react";

interface OHEIProps {
    entry: OccupationalHealthcareEntry;
    fullDiagnoses: string[];
}

const OccupationalHealthcareEntryInformation = (props: OHEIProps) => {
    const [isFullInfo, setIsFullInfo] = useState<boolean>(false)

    const entryStyle = {
        border: '2px solid red',
        padding: '10px',
        borderRadius: '7px',
        marginBottom: '5px'
    };
    const entry = props.entry;
    const diagnoses = props.fullDiagnoses;
    if (!isFullInfo) {
        return <div style={entryStyle}>
            <LocalPharmacyIcon color={'action'}/>
            <strong>{entry.date}</strong><br/>
            <i>{entry.description}</i>
            <p>Diagnosed by {entry.specialist}</p>
            <Button variant={'contained'} size={'small'} onClick={() => setIsFullInfo(true)}>Show full info</Button>
        </div>
    }

    const showSickLeave = entry.sickLeave && (entry.sickLeave.startDate || entry.sickLeave.endDate);

    return <div style={entryStyle}>
        <LocalPharmacyIcon color={'action'}/>
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
        {showSickLeave &&
            <div>
                <strong>Sick leave</strong><br/>
                {entry.sickLeave?.startDate}<br/>
                {entry.sickLeave?.endDate}<br/>
            </div>
        }
        <p>Diagnosed by {entry.specialist}</p>
        <Button variant={'contained'} size={'small'} onClick={() => setIsFullInfo(false)}>Hide full info</Button>
    </div>
};

export default OccupationalHealthcareEntryInformation;
