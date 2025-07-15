import {useEffect, useState} from "react";
import {DiaryEntry, NewDiaryEntry} from "./types.ts";
import Diaries from "./components/Diaries.tsx";
import Header from "./components/Header.tsx";
import DiaryForm from "./components/DiaryForm.tsx";
import diaryService from './services/diaries.ts';
import Notification from "./components/Notification.tsx";

function App() {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        diaryService.getAllEntries().then((content) => {setDiaries(content);});
    }, []);

    const addNewDiary = (entry: NewDiaryEntry) => {
        diaryService.addEntry(entry).then((content) => {
            if (content.error) {
               addNotification(content.error);
               return;
            }
            if (content.data) {
                const newDiaries = diaries.concat(content.data);
                setDiaries(newDiaries);
                return;
            }
            throw new Error('Something went wrong during creation');
        });
    };

    const addNotification = (message: string) => {
        setNotification(message);
        setTimeout(() => {
            setNotification('');
        }, 3000);
    };

    return (<div>
        <Header name={'Diaries'}/>
        <Notification message={notification}/>
        <DiaryForm addDiary={addNewDiary}/>
        <Diaries diaries={diaries}/>
    </div>);
}

export default App;
