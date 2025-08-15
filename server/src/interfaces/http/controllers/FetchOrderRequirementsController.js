import express from 'express';
import FetchOrderRequirementsReadModel from '../../../domain/readmodel/FetchOrderRequirementsReadModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const requirements = await FetchOrderRequirementsReadModel.query();
    res.json(requirements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default {
  routeBase: '/fetch-order-requirements',
  router,
};