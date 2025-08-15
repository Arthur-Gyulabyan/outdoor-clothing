import express from 'express';
import StartProductionCommand from '../../../domain/command/StartProductionCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { machineID, operatorName, startTime, batchNo, initialCount } = req.body;

    const result = await StartProductionCommand.execute({
      machineID,
      operatorName,
      startTime,
      batchNo,
      initialCount,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/start-production',
  router,
};