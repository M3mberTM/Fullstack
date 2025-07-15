import React from "react";
import {NewDiaryEntry} from "../types.ts";

interface DiaryFormProps {
    addDiary: (entry: NewDiaryEntry) => void;
}

const DiaryForm = (props: DiaryFormProps) => {

    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const data = event.target as HTMLFormElement;
        const date = data.date.value;
        const visibility = data.visibility.value;
        const weather = data.weather.value;
        const comment = data.comment.value;
        const diaryEntry = {
            date, visibility, weather, comment
        };
        props.addDiary(diaryEntry);
    };

    return (<div>
        <h3>Add new Entry</h3>
        <form onSubmit={submitHandler}>
            Date: <input type={'date'} name={'date'}/><br/>
            Weather: <select name={'weather'}>
            <option>sunny</option>
            <option>rainy</option>
            <option>cloudy</option>
            <option>stormy</option>
            <option>windy</option>
        </select><br/>
            Visibility: <select name={'visibility'}>
            <option>great</option>
            <option>good</option>
            <option>ok</option>
            <option>poor</option>
        </select><br/>
            Comment: <input name={'comment'}/><br/>
            <button type={'submit'}>Submit</button>
        </form>
    </div>);
};

export default DiaryForm;