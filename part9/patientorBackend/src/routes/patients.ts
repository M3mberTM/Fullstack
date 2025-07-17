import {z} from 'zod';
import express from 'express';
import patientService from "../services/patientService";
import {toNewEntry, toNewPatient} from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientService.getAllEntries());
});

router.post('/', (req, res) => {
    try {
       const newPatientEntry = toNewPatient(req.body);
       const addedEntry = patientService.addPatient(newPatientEntry);
       res.json(addedEntry);
    } catch (e: unknown) {
       if (e instanceof z.ZodError) {
           res.status(400).send({error: e.issues});
           return;
       }
        res.sendStatus(400).send({error: 'unknown error'});
    }
});

router.get('/:id', (req, res) => {
    const params = req.params;
    if (!params.id) {
        res.status(400).send({error: 'No id provided'});
    }
    const id = params.id;
    try {
        const patient = patientService.getPatient(id);
        res.json(patient);
        return;
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).send({error: e.message});
        }
    }
});

router.post('/:id/entries', (req, res) => {
    const params = req.params;
    if (!params.id) {
        res.status(400).send({error: 'No id provided'});
        return;
    }
    const id = params.id;
    try {
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientService.addPatientEntry(id, newEntry);
        console.log(addedEntry);
        res.json(addedEntry);
        return;
    } catch (e) {
        if (e instanceof z.ZodError) {
            res.status(400).send({error: e.issues});
            return;
        }
        if (e instanceof Error) {
            res.status(400).send({error: e.message});
            return;
        }
    }
});
export default router;
