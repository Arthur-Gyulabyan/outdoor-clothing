import express from 'express';
import CreateMaterialOrderCommand from '../../../domain/command/CreateMaterialOrderCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { materialType, materialGrade, quantity, supplierName, deliveryDate, pONumber } = req.body;

    const result = await CreateMaterialOrderCommand.execute({
      materialType,
      materialGrade,
      quantity,
      supplierName,
      deliveryDate,
      pONumber,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/create-material-order',
  router,
};