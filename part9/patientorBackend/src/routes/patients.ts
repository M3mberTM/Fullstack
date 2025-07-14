
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
       if (e instanceof Error) {
           res.status(400).send(e.message);
           return;
       }
        res.sendStatus(400);
    }
});
export default router;
