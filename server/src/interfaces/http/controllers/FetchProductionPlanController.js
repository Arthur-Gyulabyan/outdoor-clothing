import express from 'express';
import FetchProductionPlanReadModel from '../../../domain/readmodel/FetchProductionPlanReadModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const productionPlan = await FetchProductionPlanReadModel.query();
    res.json(productionPlan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default {
  routeBase: '/fetch-production-plan',
  router,
};