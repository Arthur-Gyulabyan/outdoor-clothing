import Shipment from '../entity/Shipment.js';
import db from '../../infrastructure/db/index.js';

const ShipmentStatus = {
  INITIATED: 'INITIATED',
  DELIVERY_IN_PROGRESS: 'DELIVERY_IN_PROGRESS',
  // Add other relevant statuses as needed (e.g., DELIVERED, CANCELED)
};

class ShipClothingCommand {
  static async execute({ shipmentNo, shipDate, trackingNo, destAddress, shippingMode, carrierName }) {
    // When shipment is initiated, then delivery begins.
    // Set the initial status to reflect that delivery is now in progress.
    const status = ShipmentStatus.DELIVERY_IN_PROGRESS;

    const shipment = new Shipment({ 
      shipmentNo, 
      shipDate, 
      trackingNo, 
      destAddress, 
      shippingMode, 
      carrierName,
      status // Include the initial status in the Shipment entity creation
    });
    
    await db.insert('Shipment', shipment.toJSON());
    return shipment.toJSON();
  }
}

export default ShipClothingCommand;