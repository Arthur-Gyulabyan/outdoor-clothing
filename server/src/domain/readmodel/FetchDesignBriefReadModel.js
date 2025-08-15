import db from '../../infrastructure/db/index.js';

class FetchDesignBriefReadModel {
  static async query() {
    const designSpecs = await db.findAll('DesignSpec');

    // Map DesignSpec entity fields to the required read model fields
    return designSpecs.map(spec => ({
      projectTitle: spec.designTitle,
      designBrief: spec.designBrief,
      styleTrends: spec.styleGuidelines,
      budgetInfo: spec.budgetInfo, // Assuming budgetInfo exists on the DesignSpec entity in the database
    }));
  }
}

export default FetchDesignBriefReadModel;