import axios from "axios";
import {Entry, NewEntry, Patient, PatientFormValues} from "../types";

import { apiBaseUrl } from "../constants";
const url = `${apiBaseUrl}/patients`

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    url
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    url,
    object
  );

  return data;
};

const getById = async (id: string) => {
  const {data} = await axios.get<Patient>(`${url}/${id}`);

  return data;
};

const addEntry = async (id: string, entry: NewEntry) => {
  const {data} = await axios.post<Entry>(`${url}/${id}/entries`, entry);

  return data;
}

export default {
  getAll, create, getById, addEntry
};

