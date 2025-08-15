import Inspection from '../../domain/inspection/Inspection.js';
import InspectionRepository from '../../domain/inspection/InspectionRepository.js';

class InMemoryInspectionRepository extends InspectionRepository {
  constructor() {
    super();
    this.inspections = new Map(); // Simulates a database table
  }

  async save(inspection) {
    this.inspections.set(inspection.id, { ...inspection });
    return inspection;
  }

  async findById(id) {
    const inspectionData = this.inspections.get(id);
    if (inspectionData) {
      return new Inspection(inspectionData);
    }
    return null;
  }

  // For testing purposes to clear the store
  clear() {
    this.inspections.clear();
  }
}

export default InMemoryInspectionRepository;