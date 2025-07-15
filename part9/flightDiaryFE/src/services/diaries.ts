import axios from 'axios';
import {DiaryEntry, NewDiaryEntry} from "../types.ts";

const BASE_URL = 'http://localhost:3000/api/diaries/';
const getAllEntries = async () => {
    const response =await axios.get<DiaryEntry[]>(BASE_URL);
    return response.data;
};

const addEntry = async (entry: NewDiaryEntry) => {
    const response = await axios.post(BASE_URL, entry);
    console.log(response);
    return response.data;
};

export default {
    getAllEntries,
    addEntry
}