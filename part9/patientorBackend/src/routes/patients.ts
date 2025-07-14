import {z} from 'zod';
import express from 'express';
import patientService from "../services/patientService";
import {toNewPatient} from "../utils";

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
export default router;
