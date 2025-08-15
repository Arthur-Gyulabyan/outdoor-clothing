class MaterialOrder {
  constructor({ pONumber, materialType, materialGrade, quantity, supplierName, deliveryDate }) {
    if (!pONumber) throw new Error('PO Number is required');

    this.id = pONumber; // Internal primary key
    this.pONumber = pONumber;
    this.materialType = materialType;
    this.materialGrade = materialGrade;
    this.quantity = quantity;
    this.supplierName = supplierName;
    this.deliveryDate = deliveryDate;
  }

  toJSON() {
    return {
      id: this.id, // Exposed internal ID
      pONumber: this.pONumber,
      materialType: this.materialType,
      materialGrade: this.materialGrade,
      quantity: this.quantity,
      supplierName: this.supplierName,
      deliveryDate: this.deliveryDate
    };
  }
}

export default MaterialOrder;