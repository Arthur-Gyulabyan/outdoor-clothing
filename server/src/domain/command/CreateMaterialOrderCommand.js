import { v4 as uuidv4 } from 'uuid';
import MaterialOrder from '../entity/MaterialOrder.js';
import db from '../../infrastructure/db/index.js';

class CreateMaterialOrderCommand {
  static async execute({ materialType, materialGrade, quantity, supplierName, deliveryDate, pONumber }) {
    const materialOrder = new MaterialOrder({
      id: uuidv4(), // Internal ID for the entity
      materialType,
      materialGrade,
      quantity,
      supplierName,
      deliveryDate,
      pONumber,
    });
    await db.insert('MaterialOrder', materialOrder.toJSON());
    return materialOrder.toJSON();
  }
}

export default CreateMaterialOrderCommand;