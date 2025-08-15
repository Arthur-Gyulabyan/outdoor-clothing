import db from '../../infrastructure/db/index.js';

class FetchProductionPlanReadModel {
  static async query() {
    // Assuming a 'ProductionPlan' collection/view exists that provides the necessary aggregated data
    // based on the read model's purpose and expected output schema.
    return await db.findAll('ProductionPlan');
  }
}

export default FetchProductionPlanReadModel;