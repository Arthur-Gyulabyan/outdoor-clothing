import express from 'express';
import GetInspectionOutcomeReadModel from '../../../domain/readmodel/GetInspectionOutcomeReadModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const inspectionOutcome = await GetInspectionOutcomeReadModel.query();
    // The response directly reflects the structure defined in the OpenAPI spec
    // for the '/get-inspection-outcome' GET endpoint.
    res.json(inspectionOutcome);
  } catch (err) {
    // In a real application, more specific error handling and logging would be implemented.
    res.status(500).json({ message: err.message });
  }
});

export default {
  routeBase: '/get-inspection-outcome', // Route base matches the OpenAPI path in kebab-case
  router,
};