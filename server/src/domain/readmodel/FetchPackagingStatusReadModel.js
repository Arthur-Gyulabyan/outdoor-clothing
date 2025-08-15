import db from '../../infrastructure/db/index.js';

class FetchPackagingStatusReadModel {
  static async query() {
    // Assuming 'Shipment' entity contains or can derive the necessary fields
    const shipments = await db.findAll('Shipment');

    // Map the raw shipment data to the desired output format as per OpenAPI specification
    return shipments.map(shipment => ({
      // 'packagingStatus' is assumed to be a property of the 'Shipment' entity
      // or derived from its state. If not directly present, it will be null or N/A.
      packagingStatus: shipment.packagingStatus || 'N/A', // Placeholder if not found directly
      deliveryAddress: shipment.destAddress,
      shippingOptions: shipment.shippingMode,
      carrierInfo: shipment.carrierName,
    }));
  }
}

export default FetchPackagingStatusReadModel;