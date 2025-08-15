import express from 'express';
import CreateProductionOrderCommand from '../../../domain/command/CreateProductionOrderCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { orderNumber, productDesign, quantityRequired, dueDate, factoryLocation } = req.body;

    // Validate required fields based on OpenAPI spec
    if (!orderNumber || !productDesign || !quantityRequired || !dueDate || !factoryLocation) {
      return res.status(400).json({ message: 'All fields (orderNumber, productDesign, quantityRequired, dueDate, factoryLocation) are required.' });
    }

    const result = await CreateProductionOrderCommand.execute({
      orderNumber,
      productDesign,
      quantityRequired,
      dueDate,
      factoryLocation,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/create-production-order',
  router,
};