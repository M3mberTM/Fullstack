import {useEffect, useState} from "react";
import {Patient, Gender, Diagnosis} from "../types.ts";
import patientService from '../services/patients.ts';
import diagnoseService from '../services/diagnoses.ts';
import { Male, Female, Transgender } from '@mui/icons-material';
import EntryList from "./EntryList.tsx";
import {Button} from "@mui/material";
import EntryForm from "./EntryForm.tsx";

interface PatientInformationProps {
    patientId: string | undefined;
}
const PatientInformation = (props: PatientInformationProps) => {

    const [patient, setPatient] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
    const [showForm, setShowForm] = useState<boolean>(false);

    const propsPatientId = props.patientId;

    if (!propsPatientId) {
        return <div>
            <h3>No such patient</h3>
        </div>
    }

    useEffect(() => {
        const fetchInformation = async () => {
            const patientInformation = await patientService.getById(propsPatientId);
            const fetchedDiagnoses = await diagnoseService.getAll();
            setPatient(patientInformation);
            setDiagnoses(fetchedDiagnoses);
        };

        void fetchInformation();
    }, []);


    if (!patient || !diagnoses) {
        return <div>
            Loading information
        </div>
    }

    let genderIcon;
    if (patient.gender === Gender.Male) {
        genderIcon = <Male/>
    } else if (patient.gender === Gender.Female) {
        genderIcon = <Female/>
    } else {
        genderIcon = <Transgender/>
    }



    return <div>
        <h3>{patient.name} {genderIcon}</h3>
        <p>ssn: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>
        {!showForm &&
            <h4>Entries <Button variant={'contained'} size={'small'} onClick={() => setShowForm(true)}>Add Entry</Button></h4>
        }
        {showForm &&
            <div>
                <h4>Entries</h4>
                <EntryForm setShowForm={setShowForm} patient={patient} setPatient={setPatient} diagnoses={diagnoses}/>
            </div>
        }
        <EntryList entries={patient.entries} diagnoses={diagnoses}/>
    </div>
};

export default PatientInformation;