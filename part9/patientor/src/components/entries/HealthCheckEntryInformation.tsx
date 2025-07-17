import {HealthCheckEntry, HealthCheckRating} from "../../types.ts";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Button} from "@mui/material";
import {useState} from "react";

interface HealthCheckEntryProps {
    entry: HealthCheckEntry;
    fullDiagnoses: string[];
}
const HealthCheckEntryInformation = (props: HealthCheckEntryProps) => {
    const [isFullInfo, setIsFullInfo] = useState<boolean>(false)

    const entryStyle = {
        border: '2px solid blue',
        padding: '10px',
        borderRadius: '7px',
        marginBottom: '5px'
    };
    const entry = props.entry;
    const diagnoses = props.fullDiagnoses;
    if (!isFullInfo) {
        return <div style={entryStyle}>
            <FavoriteIcon color={'secondary'}/>
            <strong>{entry.date}</strong><br/>
            <i>{entry.description}</i>
            <p>Diagnosed by {entry.specialist}</p>
            <Button variant={'contained'} size={'small'} onClick={() => setIsFullInfo(true)}>Show full info</Button>
        </div>
    }

    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    let rating;
    let ratingColor;
    switch (entry.healthCheckRating) {
        case HealthCheckRating.Healthy:
            rating = "Healthy";
            ratingColor = {color: 'green'};
            break;
        case HealthCheckRating.LowRisk:
            rating = "Low Risk";
            ratingColor = {color: 'blue'};
            break;
        case HealthCheckRating.HighRisk:
            rating = "High Risk";
            ratingColor = {color: 'red'};
            break;
        case HealthCheckRating.CriticalRisk:
            rating = "Critical!";
            ratingColor = {color: 'black'};
            break;
        default:
            return assertNever(entry.healthCheckRating);
    }
    return <div style={entryStyle}>
        <FavoriteIcon color={'secondary'}/>
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
        <p><strong>Rating:</strong> <span style={ratingColor}>{rating}</span></p>
        <p>Diagnosed by {entry.specialist}</p>
        <Button variant={'contained'} size={'small'} onClick={() => setIsFullInfo(false)}>Hide full info</Button>
    </div>
};

// @ts-ignore
export default HealthCheckEntryInformation;