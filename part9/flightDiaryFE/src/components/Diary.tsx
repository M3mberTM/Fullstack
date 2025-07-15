import {DiaryEntry} from "../types.ts";

interface DiaryProps {
    diary: DiaryEntry;
}
const Diary = (props: DiaryProps) => {
    const diary = props.diary;
    return (<div>
        <h3>{diary.date}</h3>
        <p>Weather: {diary.weather}</p>
        <p>Visibility: {diary.visibility}</p>
    </div>);
};

export default Diary;
