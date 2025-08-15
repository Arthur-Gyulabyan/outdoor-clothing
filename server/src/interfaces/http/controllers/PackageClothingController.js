import express from 'express';
import PackageClothingCommand from '../../../domain/command/PackageClothingCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { packageID, packagingDate, boxType, sealStatus, packagedQty, comments, isApproved } = req.body;
    const result = await PackageClothingCommand.execute({
      packageID,
      packagingDate,
      boxType,
      sealStatus,
      packagedQty,
      comments,
      isApproved,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/package-clothing',
  router,
};