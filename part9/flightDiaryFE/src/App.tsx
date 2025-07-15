import {useEffect, useState} from "react";
import axios from "axios";
import {DiaryEntry} from "./types.ts";
import Diaries from "./components/Diaries.tsx";
import Header from "./components/Header.tsx";

const BASE_URL = 'http://localhost:3000/'
function App() {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([])

    useEffect(() => {
        axios.get<DiaryEntry[]>(`${BASE_URL}api/diaries/`).then((response) => {
            setDiaries(response.data);
        })
    }, [])
    return (<div>
        <Header name={'Diaries'}/>
        <Diaries diaries={diaries}/>
    </div>)
}

export default App;
