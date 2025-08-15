import db from '../../infrastructure/db/index.js';

class FetchOrderRequirementsReadModel {
  static async query() {
    // In a real system, this read model would aggregate data from various sources
    // (e.g., design specifications, material inventory, production schedules,
    // and existing production orders) to present a consolidated view of
    // order requirements.
    // As per the constraints, we use `db.findAll` to simulate fetching this data.
    // The collection name 'order-requirements' is a conceptual placeholder
    // for the aggregated data this read model is responsible for.
    const requirements = await db.findAll('order-requirements');

    // Ensure the returned data matches the OpenAPI schema for the /fetch-order-requirements endpoint.
    // The schema expects an array of objects, where each object has
    // designApproval, materialStock, productionCapacity, and openOrders properties.
    if (!requirements || requirements.length === 0) {
      // Return a structured placeholder if no data is found,
      // to ensure the response always conforms to the schema.
      return [];
    }

    return requirements.map(item => ({
      designApproval: item.designApproval,
      materialStock: item.materialStock,
      productionCapacity: item.productionCapacity,
      openOrders: item.openOrders,
    }));
  }
}

export default FetchOrderRequirementsReadModel;