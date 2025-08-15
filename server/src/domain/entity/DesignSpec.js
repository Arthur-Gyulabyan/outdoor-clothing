import { v4 as uuidv4 } from 'uuid';

class DesignSpec {
  constructor({
    designSpecID = uuidv4(),
    designTitle,
    designBrief,
    styleGuidelines,
    materialType,
    colorPreferences,
    sketchUpload
  }) {
    this.id = designSpecID;
    this.designSpecID = designSpecID;
    this.designTitle = designTitle;
    this.designBrief = designBrief;
    this.styleGuidelines = styleGuidelines;
    this.materialType = materialType;
    this.colorPreferences = colorPreferences;
    this.sketchUpload = sketchUpload;
  }

  toJSON() {
    return {
      id: this.id,
      designSpecID: this.designSpecID,
      designTitle: this.designTitle,
      designBrief: this.designBrief,
      styleGuidelines: this.styleGuidelines,
      materialType: this.materialType,
      colorPreferences: this.colorPreferences,
      sketchUpload: this.sketchUpload
    };
  }
}

export default DesignSpec;