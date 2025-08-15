import { v4 as uuidv4 } from 'uuid';
import DesignSpec from '../entity/DesignSpec.js';
import db from '../../infrastructure/db/index.js';

class CreateDesignCommand {
  static async execute({ designTitle, designBrief, styleGuidelines, materialType, colorPreferences, sketchUpload }) {
    const designSpec = new DesignSpec({
      designSpecID: uuidv4(),
      designTitle,
      designBrief,
      styleGuidelines,
      materialType,
      colorPreferences,
      sketchUpload,
    });

    await db.insert('DesignSpec', designSpec.toJSON());
    return designSpec.toJSON();
  }
}

export default CreateDesignCommand;