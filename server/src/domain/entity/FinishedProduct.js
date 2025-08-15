class FinishedProduct {
  constructor({ finishedProdID, inspectionDate, inspector, batchNo, defectReport, scoreRating }) {
    if (!finishedProdID) throw new Error('Finished Product ID is required.');
    this.id = finishedProdID; // Internal primary key
    this.finishedProdID = finishedProdID;
    this.inspectionDate = inspectionDate;
    this.inspector = inspector;
    this.batchNo = batchNo;
    this.defectReport = defectReport;
    this.scoreRating = scoreRating;
  }

  toJSON() {
    return {
      id: this.id, // Expose internal ID
      finishedProdID: this.finishedProdID,
      inspectionDate: this.inspectionDate,
      inspector: this.inspector,
      batchNo: this.batchNo,
      defectReport: this.defectReport,
      scoreRating: this.scoreRating
    };
  }
}

export default FinishedProduct;