import { v4 as uuidv4 } from 'uuid';

class Shipment {
  constructor({
    shipmentNo = uuidv4(),
    shipDate,
    trackingNo,
    destAddress,
    shippingMode,
    carrierName
  }) {
    if (!shipmentNo) {
      throw new Error('Shipment number is required.');
    }

    this.id = shipmentNo;
    this.shipmentNo = shipmentNo;
    this.shipDate = shipDate;
    this.trackingNo = trackingNo;
    this.destAddress = destAddress;
    this.shippingMode = shippingMode;
    this.carrierName = carrierName;
  }

  toJSON() {
    return {
      id: this.id,
      shipmentNo: this.shipmentNo,
      shipDate: this.shipDate,
      trackingNo: this.trackingNo,
      destAddress: this.destAddress,
      shippingMode: this.shippingMode,
      carrierName: this.carrierName
    };
  }
}

export default Shipment;