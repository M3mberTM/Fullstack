import axios, {AxiosError} from 'axios';
import {DiaryEntry, NewDiaryEntry} from "../types.ts";

const BASE_URL = 'http://localhost:3000/api/diaries/';

export interface AddEntryResponse {
    error: string | undefined;
    data: DiaryEntry | undefined;
}
const getAllEntries = async () => {
    const response =await axios.get<DiaryEntry[]>(BASE_URL);
    return response.data;
};

const addEntry = async (entry: NewDiaryEntry):Promise<AddEntryResponse> => {
    try {
        const response = await axios.post<DiaryEntry>(BASE_URL, entry);
        return {data: response.data, error: undefined};
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error);
            if (error.response) {
                return {data: undefined, error: error.response.data};
            }
            return {data: undefined, error: error.message};
        }
        return {data: undefined, error: undefined};
    }
};

export default {
    getAllEntries,
    addEntry
};