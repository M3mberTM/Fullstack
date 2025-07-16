import {useEffect, useState} from "react";
import {Patient, Gender} from "../types.ts";
import patientService from '../services/patients.ts';
import { Male, Female, Transgender } from '@mui/icons-material';

interface PatientInformationProps {
    patientId: string | undefined;
}
const PatientInformation = (props: PatientInformationProps) => {

    const [patient, setPatient] = useState<Patient>();

    const propsPatientId = props.patientId;

    if (!propsPatientId) {
        return <div>
            <h3>No such patient</h3>
        </div>
    }

    useEffect(() => {
        const fetchPatientInformation = async () => {
            const patientInformation = await patientService.getById(propsPatientId);
            setPatient(patientInformation);
        };

        void fetchPatientInformation();
    }, []);


    if (!patient) {
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

    return (<div>
        <h3>{patient.name} {genderIcon}</h3>
        <p>ssh: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>
    </div>)
};

export default PatientInformation;