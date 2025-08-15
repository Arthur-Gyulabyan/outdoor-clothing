import express from 'express';
import GetWorkStatusReadModel from '../../../domain/readmodel/GetWorkStatusReadModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const workStatus = await GetWorkStatusReadModel.query();
    res.json(workStatus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default {
  routeBase: '/get-work-status',
  router,
};