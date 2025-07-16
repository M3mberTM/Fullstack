import {useEffect, useState} from "react";
import {Patient, Gender, Diagnosis} from "../types.ts";
import patientService from '../services/patients.ts';
import diagnoseService from '../services/diagnoses.ts';
import { Male, Female, Transgender } from '@mui/icons-material';
import EntryList from "./EntryList.tsx";

interface PatientInformationProps {
    patientId: string | undefined;
}
const PatientInformation = (props: PatientInformationProps) => {

    const [patient, setPatient] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

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
        <h4>Entries</h4>
        <EntryList entries={patient.entries} diagnoses={diagnoses}/>
    </div>
};

export default PatientInformation;