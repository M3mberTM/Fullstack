import {NewPatient, Patient} from "../types";
import data from '../data/patients';
import {v1 as uuid} from 'uuid';

const getAllEntries = (): Omit<Patient, 'ssn'>[] => {
    return data.map(({id, name, dateOfBirth, gender, occupation, entries}) => {
        return {id, name, dateOfBirth, gender, occupation, entries};
    });
};

const addPatient = (entry: NewPatient): Patient => {
    const id = uuid();
    const newPatientEntry = {...entry, id: id};
    data.push(newPatientEntry);
    return newPatientEntry;
};

const getPatient = (id: string): Patient => {
    const patient = data.find((entry) => entry.id === id);
    if (!patient) {
        throw new Error('No such patient');
    }
    return patient;
};

export default {
    getAllEntries,
    addPatient,
    getPatient
};