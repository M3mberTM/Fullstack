import {useEffect, useState} from "react";
import {DiaryEntry, NewDiaryEntry} from "./types.ts";
import Diaries from "./components/Diaries.tsx";
import Header from "./components/Header.tsx";
import DiaryForm from "./components/DiaryForm.tsx";
import diaryService from './services/diaries.ts';

function App() {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([])

    useEffect(() => {
        diaryService.getAllEntries().then((content) => {setDiaries(content)})
    }, [])

    const addNewDiary = (entry: NewDiaryEntry) => {
        diaryService.addEntry(entry).then((content) => {
            console.log(content);
            const newDiaries = diaries.concat(content);
            setDiaries(newDiaries);
        })
    }

    return (<div>
        <Header name={'Diaries'}/>
        <DiaryForm addDiary={addNewDiary}/>
        <Diaries diaries={diaries}/>
    </div>)
}

export default App;
