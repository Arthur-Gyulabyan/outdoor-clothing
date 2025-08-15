import { v4 as uuidv4 } from 'uuid';
import ProductionSchedule from '../entity/ProductionSchedule.js';
import db from '../../infrastructure/db/index.js';

class ScheduleProductionCommand {
  static async execute({ startDate, endDate, shiftDetails, operatorId, productionLine }) {
    // To satisfy "Given existing orders", retrieve relevant orders for the production line.
    // Assumes 'db' can perform a find operation on 'Orders' collection/table.
    const relevantOrders = await db.findMany('Orders', { productionLine });
    const orderIds = relevantOrders.map(order => order.id);

    // Domain logic: If no orders are found, a decision might be made (e.g., throw an error
    // or proceed with a schedule not explicitly linked to orders).
    // For "Given existing orders" as a precondition, an error might be appropriate here.
    // if (orderIds.length === 0) {
    //   throw new Error('No existing orders found for the specified production line. Cannot schedule production.');
    // }

    const scheduleID = uuidv4();
    const productionSchedule = new ProductionSchedule({
      scheduleID,
      startDate,
      endDate,
      shiftDetails,
      operatorId,
      productionLine,
      orderIds, // Pass the collected order IDs to the ProductionSchedule entity
    });
    await db.insert('ProductionSchedule', productionSchedule.toJSON());
    return productionSchedule.toJSON();
  }
}

export default ScheduleProductionCommand;