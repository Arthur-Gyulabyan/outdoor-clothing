import { v4 as uuidv4 } from 'uuid';

class Product {
  constructor({ id, name, status, manufacturingDate, inspectionId = null }) {
    if (!id) {
      this.id = uuidv4();
    } else {
      this.id = id;
    }
    this.name = name;
    this.status = status; // e.g., 'FINISHED', 'IN_INSPECTION', 'INSPECTED_OK', 'INSPECTED_DEFECTIVE'
    this.manufacturingDate = manufacturingDate;
    this.inspectionId = inspectionId; // Link to the latest inspection
  }

  static createFinishedProduct(name, manufacturingDate) {
    return new Product({
      name,
      status: 'FINISHED',
      manufacturingDate,
    });
  }

  markForInspection() {
    if (this.status !== 'FINISHED') {
      throw new Error(`Product must be 'FINISHED' to be marked for inspection. Current status: ${this.status}`);
    }
    this.status = 'IN_INSPECTION';
  }

  markInspected(inspectionId, hasDefects) {
    this.inspectionId = inspectionId;
    this.status = hasDefects ? 'INSPECTED_DEFECTIVE' : 'INSPECTED_OK';
  }
}

export default Product;