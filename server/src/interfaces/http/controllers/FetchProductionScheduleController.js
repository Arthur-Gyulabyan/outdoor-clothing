import express from 'express';
import FetchProductionScheduleReadModel from '../../../domain/readmodel/FetchProductionScheduleReadModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const productionSchedule = await FetchProductionScheduleReadModel.query();
    res.json(productionSchedule);
  } catch (err) {
    // Log the error for debugging purposes (in a real app)
    console.error(`Error fetching production schedule: ${err.message}`);
    res.status(500).json({ message: 'Failed to retrieve production schedule.' });
  }
});

export default {
  routeBase: '/get-production-schedule', // Matches the OpenAPI path /get-production-schedule
  router,
};