import express from 'express';
import ShipClothingCommand from '../../../domain/command/ShipClothingCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { shipmentNo, shipDate, trackingNo, destAddress, shippingMode, carrierName } = req.body;
    const result = await ShipClothingCommand.execute({ shipmentNo, shipDate, trackingNo, destAddress, shippingMode, carrierName });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/ship-clothing',
  router,
};