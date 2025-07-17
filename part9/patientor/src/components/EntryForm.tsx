import {Dispatch, SetStateAction, SyntheticEvent, useState} from "react";
import {Button, MenuItem, Select, TextField, Alert} from "@mui/material";
import {Diagnosis, EntryType, Patient} from "../types.ts";
import OccupationalEntryForm from "./OccupationalEntryForm.tsx";
import HealthCheckForm from "./HealthCheckForm.tsx";
import HospitalEntryForm from "./HospitalEntryForm.tsx";
import patientService from '../services/patients.ts';
import {AxiosError} from "axios";

interface EntryFormProps {
    setShowForm: Dispatch<SetStateAction<boolean>>;
    patient: Patient;
    setPatient: Dispatch<SetStateAction<Patient | undefined>>;
    diagnoses: Diagnosis[];
}

const EntryForm = (props: EntryFormProps) => {
    const [codes, setCodes] = useState<string[]>([]);
    const [entryType, setEntryType] = useState<string>(EntryType.Hospital);
    const [error, setError] = useState<string>('');

    const createError = (message: string) => {
        setError(message);
        setTimeout(() => {
            setError('')
        }, 3000);
    }

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        const data = event.target as HTMLFormElement;
        const date = data.date.value;
        const specialist = data.specialist.value;
        const diagnosesCodes = codes;
        const description = data.description.value;
        let entry;
        if (entryType === EntryType.Hospital) {
            const dischargeDate = data.dischargeDate.value;
            const criteria = data.criteria.value;
            entry = {
                date: date,
                specialist: specialist,
                description: description,
                type: EntryType.Hospital as EntryType.Hospital,
                diagnosisCodes: diagnosesCodes,
                discharge: {
                    date: dischargeDate,
                    criteria: criteria
                }
            };
        } else if (entryType === EntryType.Occupational) {
            const employerName = data.employerName.value;
            entry = {
                date: date,
                specialist: specialist,
                description: description,
                type: EntryType.Occupational as EntryType.Occupational,
                diagnosisCodes: diagnosesCodes,
                employerName: employerName
            };
            if (data.wasSick.checked) {
                entry = {...entry, sickLeave: {startDate: data.sickStart.value, endDate: data.sickEnd.value}};
            }
        } else if (entryType === EntryType.HealthCheck) {
            entry = {
                date: date,
                specialist: specialist,
                description: description,
                type: EntryType.HealthCheck as EntryType.HealthCheck,
                diagnosisCodes: diagnosesCodes,
                healthCheckRating: parseInt(data.rating.value)
            };
        }
        // @ts-ignore
        patientService.addEntry(props.patient.id, entry).then((result) => {
            const patientEntries = props.patient.entries;
            const newPatient = {...props.patient, entries: patientEntries.concat(result)}
            props.setPatient(newPatient);
            props.setShowForm(false);
        }, (e) => {
            if (e instanceof AxiosError) {
                if (e.response) {
                    const message = e.response.data.error[0].message;
                    const origin = e.response.data.error[0].path.join(', ');
                    createError(`${message}; Origin: ${origin}`);
                } else {
                    createError(e.toJSON().toString());
                }
            } else {
                console.log(e);
            }
        });
        return;
    };

    return <div style={{marginBottom: '10px', borderRadius: '10px', border: '2px dotted black', padding: '10px'}}>
        {error.length > 0 &&
            <Alert severity={'error'}>{error}</Alert>
        }
        <h3 style={{marginTop: '0px'}}>New entry</h3>
        <form onSubmit={handleSubmit}>
            <TextField variant={'standard'} size={'small'} name={'date'} type={'date'}/><br/>
            <TextField label={'specialist'} variant={'standard'} size={'small'} name={'specialist'}/><br/>
            <span>Codes: </span>
            <Select label={'Code'} variant={'standard'} size={'small'} name={'code'} value={codes} onChange={(event) => {
                const content = event.target.value;
                if (Array.isArray(content)) {
                    setCodes(content);
                } else {
                    setCodes([content]);
                }
            }
            } multiple>
                {props.diagnoses.map((item) => {
                    return <MenuItem key={item.code} value={item.code}>{item.code}</MenuItem>;
                })}
            </Select><br/>
            <TextField label={'description'} variant={'standard'} size={'small'} name={'description'}/><br/>
            <Select label={'Entry type'} size={'small'} variant={'standard'} value={entryType}
                    onChange={(event) => setEntryType(event.target.value)}>
                {Object.values(EntryType).map((type) => {
                    return <MenuItem key={type} value={type}>{type}</MenuItem>;
                })}
            </Select><br/>
            <br/>
            {entryType === EntryType.Occupational &&
                <OccupationalEntryForm/>
            }
            {entryType === EntryType.HealthCheck &&
                <HealthCheckForm/>
            }
            {entryType === EntryType.Hospital &&
                <HospitalEntryForm/>
            }
            <div style={{marginTop: '10px'}}>
                <Button type={'submit'} variant={'contained'} size={'small'}>Create</Button>
                <Button onClick={() => props.setShowForm(false)} variant={'contained'} size={'small'}>Cancel</Button>
            </div>
        </form>

    </div>
};

export default EntryForm;