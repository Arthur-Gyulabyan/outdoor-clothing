class ProductionOrder {
  constructor({ orderNumber, productDesign, quantityRequired, dueDate, factoryLocation }) {
    if (!orderNumber) {
      throw new Error('Order Number is required');
    }
    if (!productDesign) {
      throw new Error('Product Design is required');
    }
    if (!quantityRequired) {
      throw new Error('Quantity Required is required');
    }
    if (!dueDate) {
      throw new Error('Due Date is required');
    }
    if (!factoryLocation) {
      throw new Error('Factory Location is required');
    }

    // The 'id' property serves as the internal primary key, derived from 'orderNumber' as it's the designated primary key.
    this.id = orderNumber;
    this.orderNumber = orderNumber;
    this.productDesign = productDesign;
    this.quantityRequired = quantityRequired;
    this.dueDate = dueDate;
    this.factoryLocation = factoryLocation;
  }

  toJSON() {
    return {
      id: this.id, // Internal primary key
      orderNumber: this.orderNumber, // API field name for order number
      productDesign: this.productDesign,
      quantityRequired: this.quantityRequired,
      dueDate: this.dueDate,
      factoryLocation: this.factoryLocation
    };
  }
}

export default ProductionOrder;