import {Gender, NewPatient, NewEntry, EntryType, HealthCheckRating, Diagnosis} from "./types";
import {z} from 'zod';

const newPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string()
});

const newEntrySchema = z.object({
    date: z.string().date(),
    specialist: z.string().min(2),
    description: z.string(),
    type: z.enum(EntryType),
    diagnosisCodes: z.string().array().optional()
});

const HospitalEntrySchema = z.object({
    date: z.string().date(),
    specialist: z.string(),
    description: z.string(),
    type: z.literal(EntryType.Hospital),
    diagnosisCodes: z.string().array().optional(),
    discharge: z.object({
        date: z.string().date(),
        criteria: z.string(),
    })
});

const HealthCheckEntrySchema = z.object({
    date: z.string().date(),
    specialist: z.string(),
    description: z.string(),
    type: z.literal(EntryType.HealthCheck),
    diagnosisCodes: z.string().array().optional(),
    healthCheckRating: z.enum(HealthCheckRating),
});

const OccupationalEntrySchema = z.object({
    date: z.string().date(),
    specialist: z.string(),
    description: z.string(),
    type: z.literal(EntryType.Occupational),
    diagnosisCodes: z.string().array().optional(),
    employerName: z.string(),
    sickLeave: z.object({
        startDate: z.string(),
        endDate: z.string()
    }).optional()
});
const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

export const toNewPatient = (object: unknown): NewPatient => {
    const newPatient = newPatientSchema.parse(object);
    return {...newPatient, entries: []};
};

export const toNewEntry = (object: unknown): NewEntry => {
    console.log('Received entry: ', object);
    const newEntry = newEntrySchema.parse(object);
    if (typeof object === 'object') {
        // zod removes all the extra parameters, so I am adding them back in
        const parsedEntry = {...newEntry, diagnosisCodes: parseDiagnosisCodes(newEntry), ...object};
        switch (parsedEntry.type) {
            case EntryType.HealthCheck:
                return HealthCheckEntrySchema.parse(parsedEntry);
            case EntryType.Hospital:
                return HospitalEntrySchema.parse(parsedEntry);
            case EntryType.Occupational:
                return OccupationalEntrySchema.parse(parsedEntry);
            default:
                throw new Error('Unknown entry type');
        }
    }
    throw new Error('Something went wrong!')
}

