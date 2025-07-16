import {Gender, NewPatient} from "./types";
import {z} from 'zod';

const newPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string()
});

export const toNewPatient = (object: unknown): NewPatient => {
    const newPatient = newPatientSchema.parse(object);
    return {...newPatient, entries: []};
};

