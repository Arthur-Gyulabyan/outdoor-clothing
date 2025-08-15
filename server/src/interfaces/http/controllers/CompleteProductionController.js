import express from 'express';
import CompleteProductionCommand from '../../../domain/command/CompleteProductionCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { processId, endTime, totalUnits, defectsCount, qualityReport, operatorNote } = req.body;

    const result = await CompleteProductionCommand.execute({
      processId,
      endTime,
      totalUnits,
      defectsCount,
      qualityReport,
      operatorNote,
    });

    res.status(200).json(result);
  } catch (err) {
    // A 404 for not found or 409 for conflict (already completed) might be more precise,
    // but 400 is a general client error.
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/complete-production',
  router,
};