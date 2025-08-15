import express from 'express';
import CreateDesignCommand from '../../../domain/command/CreateDesignCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { designTitle, designBrief, styleGuidelines, materialType, colorPreferences, sketchUpload } = req.body;
    const result = await CreateDesignCommand.execute({
      designTitle,
      designBrief,
      styleGuidelines,
      materialType,
      colorPreferences,
      sketchUpload,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/create-design',
  router,
};