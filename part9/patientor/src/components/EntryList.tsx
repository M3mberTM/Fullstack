import {Diagnosis, Entry} from "../types.ts";
import EntryInformation from "./EntryInformation.tsx";

interface EntryListProps {
    entries: Entry[];
    diagnoses: Diagnosis[];
}

const EntryList = (props: EntryListProps) => {

    return (<div>
        {props.entries.map((entry) => {
            return <EntryInformation key={entry.id} entry={entry} diagnoses={props.diagnoses}/>
        })}
    </div>)
};

export default EntryList;