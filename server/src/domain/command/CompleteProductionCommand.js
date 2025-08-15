import ProductionProcess from '../entity/ProductionProcess.js';
import db from '../../infrastructure/db/index.js';

class CompleteProductionCommand {
  static async execute({ processId, endTime, totalUnits, defectsCount, qualityReport, operatorNote }) {
    const processData = await db.findById('ProductionProcess', processId);

    if (!processData) {
      throw new Error(`Production process with ID ${processId} not found.`);
    }

    const productionProcess = new ProductionProcess(processData);

    if (productionProcess.endTime) {
      throw new Error(`Production process with ID ${processId} is already completed.`);
    }

    productionProcess.endTime = endTime;
    productionProcess.totalUnits = totalUnits;
    productionProcess.defectsCount = defectsCount;
    productionProcess.qualityReport = qualityReport;
    productionProcess.operatorNote = operatorNote;

    await db.update('ProductionProcess', productionProcess.toJSON());
    
    return productionProcess.toJSON();
  }
}

export default CompleteProductionCommand;