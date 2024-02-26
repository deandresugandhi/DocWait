import { Router } from 'express';
import { QueueEntriesModel } from "../db.js";

const router = Router();

async function searchPatientQueue(queueModel, searchTerm) {
    const normalizedTerm = searchTerm.toLowerCase();
  
    try {
      // Populate the 'patient' field with the full patient data
      const populatedQueue = await queueModel.find({ queueState: "In progress" })
        .populate('patient', 'firstName lastName');
  
      // Filter based on search term in first or last name
      const filteredQueue = populatedQueue.filter((queueEntry) => {
        const patient = queueEntry.patient;
        const normalizedFirstName = patient.firstName.toLowerCase();
        const normalizedLastName = patient.lastName.toLowerCase();
        return normalizedFirstName.includes(normalizedTerm) || normalizedLastName.includes(normalizedTerm);
      });
  
      return filteredQueue;
    } catch (error) {
      console.error('Error searching queue:', error);
      throw error; // Re-throw the error for proper handling
    }
  }
  

export default router;

