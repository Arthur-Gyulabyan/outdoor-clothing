import db from '../../infrastructure/db/index.js';

class FetchProductionScheduleReadModel {
  static async query() {
    const productionSchedules = await db.findAll('ProductionSchedule'); // Assuming 'ProductionSchedule' is the entity name

    // Map the internal entity data to the OpenAPI schema for /get-production-schedule
    return productionSchedules.map(schedule => ({
      scheduledBatch: schedule.batchNumber || null, // Assuming batchNumber field exists
      productionOrder: schedule.orderId || null,   // Assuming orderId field exists
      shiftStartTime: schedule.shiftStart || null, // Assuming shiftStart field exists
      machineReadiness: schedule.machineStatus || null, // Assuming machineStatus field exists
    }));
  }
}

export default FetchProductionScheduleReadModel;