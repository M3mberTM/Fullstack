
export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export enum EntryType {
    Hospital = 'Hospital',
    Occupational = 'OccupationalHealthcare',
    HealthCheck = 'HealthCheck'
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface BaseEntry {
    id: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Diagnosis['code'][];
    description: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: EntryType.Occupational;
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}

interface HospitalEntry extends BaseEntry {
    type: EntryType.Hospital;
    discharge: {
        date: string;
        criteria: string;
    };
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: EntryType.HealthCheck;
    healthCheckRating: HealthCheckRating;
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export interface Patient {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: Gender;
    dateOfBirth: string;
    entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;
// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewEntry = UnionOmit<Entry, 'id'>;
