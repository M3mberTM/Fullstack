import {Diagnosis, Entry} from "../types.ts";

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

    return <div>
        <strong>{entry.date} {entry.description}</strong>
        {entry.diagnosisCodes &&
            <ul>
                {entry.diagnosisCodes.map((code) => {
                    return <li key={code}>{code} {getDiagnosis(code)}</li>
                })}
            </ul>
        }
    </div>
};

export default EntryInformation;