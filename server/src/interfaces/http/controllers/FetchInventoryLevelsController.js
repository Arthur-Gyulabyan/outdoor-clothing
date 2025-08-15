import express from 'express';
import FetchInventoryLevelsReadModel from '../../../domain/readmodel/FetchInventoryLevelsReadModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const inventoryLevels = await FetchInventoryLevelsReadModel.query();
    // OpenAPI specifies an array with objects having currentStock, supplierReliability, priceFluctuation, leadTime
    // Ensure the data returned by the read model matches this structure.
    // Assuming the 'InventoryLevel' entity in DB returns objects with these keys.
    res.json(inventoryLevels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default {
  routeBase: '/fetch-inventory-levels',
  router,
};