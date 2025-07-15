import {DiaryEntry} from "../types.ts";
import Diary from "./Diary.tsx";

interface DiariesProps {
    diaries: DiaryEntry[]
}
const Diaries = (props: DiariesProps) => {

    return (
        <div id={'diaries'}>
            <h3>Diary entries</h3>
            {props.diaries.map((diary) => {
                return <Diary key={diary.id} diary={diary}/>;
            })}
        </div>
    );
};

export default Diaries;