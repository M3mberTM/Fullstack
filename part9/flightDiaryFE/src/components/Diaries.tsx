import {DiaryEntry} from "../types.ts";
import Diary from "./Diary.tsx";

interface DiariesProps {
    diaries: DiaryEntry[]
}
const Diaries = (props: DiariesProps) => {

    return (
        <div id={'diaries'}>
            {props.diaries.map((diary) => {
                return <Diary diary={diary}/>
            })}
        </div>
    )
};

export default Diaries;