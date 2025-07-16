import {Diagnosis, Entry} from "../types.ts";
import HospitalEntryInformation from "./entries/HospitalEntryInformation.tsx";
import OccupationalHealthcareEntryInformation from "./entries/OccupationalHealthcareEntryInformation.tsx";
import HealthCheckEntryInformation from "./entries/HealthCheckEntryInformation.tsx";

interface EntryInformationProps {
    entry: Entry;
    diagnoses: Diagnosis[];
}
const EntryInformation = (props: EntryInformationProps) => {

    const entry = props.entry;
    const diagnoses = props.diagnoses;
    const getDiagnosis = (code: string): string => {
        const diagnosis = diagnoses.find((a) => a.code === code);
        if (!diagnosis) {
            return '';
        } else {
            return diagnosis.name;
        }
    };
    let fullDiagnoses: string[] = [];
    if (entry.diagnosisCodes) {
        fullDiagnoses = entry.diagnosisCodes.map((code) => `${code} ${getDiagnosis(code)}`);
    }
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    switch(entry.type) {
        case "Hospital":
            return <HospitalEntryInformation entry={entry} fullDiagnoses={fullDiagnoses}/>;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryInformation entry={entry} fullDiagnoses={fullDiagnoses}/>;
        case "HealthCheck":
            return <HealthCheckEntryInformation entry={entry} fullDiagnoses={fullDiagnoses}/>;
        default:
            return assertNever(entry);
    }

};

export default EntryInformation;