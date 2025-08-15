import { v4 as uuidv4 } from 'uuid';
import ProductionOrder from '../entity/ProductionOrder.js';
import db from '../../infrastructure/db/index.js';

// A placeholder for a domain service that checks design approval.
// In a real DDD application, this might be a dedicated DesignApprovalService,
// a repository lookup for approved designs, or an aggregate responsible for designs.
const DesignApprovalService = {
  isApproved: (productDesign) => {
    // For the purpose of this exercise, assume only specific designs are approved.
    // Replace with actual business logic (e.g., database lookup, external service call).
    const approvedDesigns = ['AlphaDesign_v1', 'BetaDesign_v2', 'GammaDesign_v1'];
    return approvedDesigns.includes(productDesign);
  },
};

class CreateProductionOrderCommand {
  static async execute({ orderNumber, productDesign, quantityRequired, dueDate, factoryLocation }) {
    if (!DesignApprovalService.isApproved(productDesign)) {
      throw new Error(`Product design '${productDesign}' is not approved for production.`);
    }

    const id = uuidv4();
    const productionOrder = new ProductionOrder({
      id,
      orderNumber,
      productDesign,
      quantityRequired,
      dueDate,
      factoryLocation,
    });
    await db.insert('ProductionOrder', productionOrder.toJSON());
    return productionOrder.toJSON();
  }
}

export default CreateProductionOrderCommand;