import { v4 as uuidv4 } from 'uuid';
import ProductionProcess from '../entity/ProductionProcess.js';
import db from '../../infrastructure/db/index.js';

class StartProductionCommand {
  static async execute({ machineID, operatorName, startTime, batchNo, initialCount }) {
    const processID = uuidv4();
    // Assuming ProductionProcess entity supports a 'status' field and defaults to 'active' on creation
    // or requires it explicitly set during start.
    const productionProcess = new ProductionProcess({
      processID,
      machineID,
      operatorName,
      startTime,
      batchNo,
      initialCount,
      status: 'active', // Set status to 'active' as per "then process is active"
    });
    await db.insert('ProductionProcess', productionProcess.toJSON());
    return productionProcess.toJSON();
  }
}

export default StartProductionCommand;