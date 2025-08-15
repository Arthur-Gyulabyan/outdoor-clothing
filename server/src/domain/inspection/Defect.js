class Defect {
  constructor(description, severity) {
    if (!description) {
      throw new Error('Defect description is required.');
    }
    if (!['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].includes(severity)) {
      throw new Error('Invalid defect severity. Must be LOW, MEDIUM, HIGH, or CRITICAL.');
    }
    this.description = description;
    this.severity = severity;
  }
}

export default Defect;