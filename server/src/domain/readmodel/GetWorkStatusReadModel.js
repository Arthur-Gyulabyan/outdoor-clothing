import db from '../../infrastructure/db/index.js';

class GetWorkStatusReadModel {
  static async query() {
    const processes = await db.findAll('ProductionProcess');

    return processes.map(process => {
      let productionStatus;
      if (process.endTime) {
        productionStatus = process.qualityReport === 'Pass' ? 'Completed - Pass' : 'Completed - Fail';
      } else {
        productionStatus = 'In Progress';
      }

      return {
        productionStatus: productionStatus,
        expectedUnits: process.initialCount,
        qualityBenchmarks: process.qualityReport,
        defectRecords: process.defectsCount,
      };
    });
  }
}

export default GetWorkStatusReadModel;