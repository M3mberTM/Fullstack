import {Patient} from "../types";
import data from '../data/patients';

const getAllEntries = (): Omit<Patient, 'ssn'>[] => {
    return data.map(({id, name, dateOfBirth, gender, occupation}) => {
        return {id, name, dateOfBirth, gender, occupation}
    })
};

export default {
    getAllEntries
};