import Product from '../Product.js';
import Inspection from '../../inspection/Inspection.js';
import Defect from '../../inspection/Defect.js';

class ProductInspectionService {
  constructor(productRepository, inspectionRepository) {
    if (!productRepository || !inspectionRepository) {
      throw new Error('ProductRepository and InspectionRepository are required.');
    }
    this.productRepository = productRepository;
    this.inspectionRepository = inspectionRepository;
  }

  async performInspection(productId, detectedDefects = []) {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new Error(`Product with ID ${productId} not found.`);
    }

    if (product.status !== 'FINISHED') {
      throw new Error(`Product ${product.id} must be in 'FINISHED' status to be inspected.`);
    }

    // Create an Inspection aggregate
    const inspection = new Inspection({ productId: product.id });

    // Add detected defects
    for (const defectData of detectedDefects) {
      inspection.addDefect(defectData.description, defectData.severity);
    }

    // Save the inspection
    await this.inspectionRepository.save(inspection);

    // Update product status based on inspection result
    product.markInspected(inspection.id, inspection.hasDefects());
    await this.productRepository.save(product);

    return { product, inspection };
  }
}

export default ProductInspectionService;