import { v4 as uuidv4 } from 'uuid';

class ProductionProcess {
  constructor({
    processID = uuidv4(),
    machineID,
    operatorName,
    startTime,
    batchNo,
    initialCount,
    endTime,
    totalUnits,
    defectsCount,
    qualityReport,
    operatorNote
  }) {
    this.id = processID; // Internal primary key, matching the API's processID
    this.processID = processID;
    this.machineID = machineID;
    this.operatorName = operatorName;
    this.startTime = startTime;
    this.batchNo = batchNo;
    this.initialCount = initialCount;
    this.endTime = endTime;
    this.totalUnits = totalUnits;
    this.defectsCount = defectsCount;
    this.qualityReport = qualityReport;
    this.operatorNote = operatorNote;
  }

  toJSON() {
    return {
      id: this.id,
      processID: this.processID,
      machineID: this.machineID,
      operatorName: this.operatorName,
      startTime: this.startTime,
      batchNo: this.batchNo,
      initialCount: this.initialCount,
      endTime: this.endTime,
      totalUnits: this.totalUnits,
      defectsCount: this.defectsCount,
      qualityReport: this.qualityReport,
      operatorNote: this.operatorNote
    };
  }
}

export default ProductionProcess;