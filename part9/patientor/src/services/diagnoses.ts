import axios from "axios";

import { apiBaseUrl } from "../constants";
import {Diagnosis} from "../types.ts";
const url = `${apiBaseUrl}/diagnoses`;

const getAll = async () => {
    const { data } = await axios.get<Diagnosis[]>(
        url
    );

    return data;
};


export default {
    getAll
}
