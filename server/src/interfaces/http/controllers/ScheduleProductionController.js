import express from 'express';
import ScheduleProductionCommand from '../../../domain/command/ScheduleProductionCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { startDate, endDate, shiftDetails, operatorId, productionLine } = req.body;
    const result = await ScheduleProductionCommand.execute({
      startDate,
      endDate,
      shiftDetails,
      operatorId,
      productionLine,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/schedule-production',
  router,
};