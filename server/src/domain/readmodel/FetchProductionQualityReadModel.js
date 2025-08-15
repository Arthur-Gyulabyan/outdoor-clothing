import db from '../../infrastructure/db/index.js';

class FetchProductionQualityReadModel {
  static async query() {
    const finishedProducts = await db.findAll('FinishedProduct');

    return finishedProducts.map(product => {
      const defectRate = product.scoreRating ? (100 - parseFloat(product.scoreRating)).toFixed(2) + '%' : 'N/A';
      const inspectionCriteria = product.defectReport && product.defectReport !== 'None'
        ? `Defects reported: ${product.defectReport}.`
        : `No significant defects reported.`;
      
      return {
        batchInfo: product.batchNo || 'N/A',
        inspectionCriteria: inspectionCriteria,
        defectRate: defectRate,
        standardValues: 'Quality score > 90, Defects: Minor/None', // Placeholder as per spec's data constraints
      };
    });
  }
}

export default FetchProductionQualityReadModel;