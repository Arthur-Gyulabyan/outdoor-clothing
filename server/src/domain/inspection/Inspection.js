import { v4 as uuidv4 } from 'uuid';
import Defect from './Defect.js';

class Inspection {
  constructor({ id, productId, inspectionDate, defects = [] }) {
    if (!id) {
      this.id = uuidv4();
    } else {
      this.id = id;
    }
    this.productId = productId;
    this.inspectionDate = inspectionDate || new Date();
    this.defects = defects.map(d => (d instanceof Defect ? d : new Defect(d.description, d.severity)));
  }

  addDefect(description, severity) {
    const defect = new Defect(description, severity);
    this.defects.push(defect);
  }

  hasDefects() {
    return this.defects.length > 0;
  }
}

export default Inspection;