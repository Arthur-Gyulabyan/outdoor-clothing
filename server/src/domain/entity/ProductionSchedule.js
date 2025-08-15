import { v4 as uuidv4 } from 'uuid';

class ProductionSchedule {
  constructor({
    scheduleID = uuidv4(),
    startDate,
    endDate,
    shiftDetails,
    operatorId,
    productionLine
  }) {
    if (!scheduleID) {
      throw new Error('Schedule ID is required');
    }
    if (!startDate) {
      throw new Error('Start Date is required');
    }
    if (!endDate) {
      throw new Error('End Date is required');
    }
    if (!shiftDetails) {
      throw new Error('Shift Details are required');
    }
    if (!operatorId) {
      throw new Error('Operator ID is required');
    }
    if (!productionLine) {
      throw new Error('Production Line is required');
    }

    this.id = scheduleID; // Internal primary key mapping
    this.scheduleID = scheduleID;
    this.startDate = startDate;
    this.endDate = endDate;
    this.shiftDetails = shiftDetails;
    this.operatorId = operatorId;
    this.productionLine = productionLine;
  }

  toJSON() {
    return {
      id: this.id, // Expose internal ID
      scheduleID: this.scheduleID,
      startDate: this.startDate,
      endDate: this.endDate,
      shiftDetails: this.shiftDetails,
      operatorId: this.operatorId,
      productionLine: this.productionLine
    };
  }
}

export default ProductionSchedule;