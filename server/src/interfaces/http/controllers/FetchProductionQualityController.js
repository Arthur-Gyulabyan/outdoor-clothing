import express from 'express';
import FetchProductionQualityReadModel from '../../../domain/readmodel/FetchProductionQualityReadModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const productionQuality = await FetchProductionQualityReadModel.query();
    res.json(productionQuality);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default {
  routeBase: '/fetch-production-quality',
  router,
};