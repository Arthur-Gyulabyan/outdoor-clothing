import db from '../../infrastructure/db/index.js';

class GetInspectionOutcomeReadModel {
  /**
   * Queries the database for inspection outcome data.
   * The returned data must strictly conform to the OpenAPI specification for
   * the /get-inspection-outcome endpoint's response schema, which includes
   * 'inspectionOutcome', 'approvedQty', 'packagingGuidelines', and 'packageMaterials'.
   *
   * Given the read model's purpose and the OpenAPI response schema, we assume
   * a conceptual 'InspectionOutcome' collection or projection in the database
   * that directly provides these fields.
   *
   * @returns {Promise<Array<{inspectionOutcome: string, approvedQty: string, packagingGuidelines: string, packageMaterials: string}>>}
   */
  static async query() {
    // The entity name 'InspectionOutcome' is chosen to directly align with the
    // output structure defined in the OpenAPI specification for this read model,
    // as the provided 'PackagedItem' schema does not include these specific fields.
    // This adheres to the principle that the `db.findAll` operation should return
    // data directly matching the required output structure.
    return await db.findAll('InspectionOutcome');
  }
}

export default GetInspectionOutcomeReadModel;