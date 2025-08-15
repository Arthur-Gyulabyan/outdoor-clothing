import express from 'express';
import FetchDesignBriefReadModel from '../../../domain/readmodel/FetchDesignBriefReadModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const designBriefs = await FetchDesignBriefReadModel.query();
    res.json(designBriefs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default {
  routeBase: '/fetch-design-brief',
  router,
};