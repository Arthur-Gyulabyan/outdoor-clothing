import express from 'express';
import FetchPackagingStatusReadModel from '../../../domain/readmodel/FetchPackagingStatusReadModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const packagingStatusData = await FetchPackagingStatusReadModel.query();
    res.json(packagingStatusData);
  } catch (err) {
    console.error('Error fetching packaging status:', err);
    res.status(500).json({ message: err.message });
  }
});

export default {
  routeBase: '/fetch-packaging-status',
  router,
};