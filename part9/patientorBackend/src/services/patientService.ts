import {NewPatient, Patient} from "../types";
import data from '../data/patients';
import {v1 as uuid} from 'uuid';

const getAllEntries = (): Omit<Patient, 'ssn'>[] => {
    return data.map(({id, name, dateOfBirth, gender, occupation}) => {
        return {id, name, dateOfBirth, gender, occupation};
    });
};

const addPatient = (entry: NewPatient): Patient => {
    const id = uuid();
    const newPatientEntry = {...entry, id: id};
    data.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getAllEntries,
    addPatient
};