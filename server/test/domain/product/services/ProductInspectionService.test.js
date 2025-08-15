import ProductInspectionService from '../../../../src/domain/product/services/ProductInspectionService.js';
import InMemoryProductRepository from '../../../../src/infrastructure/repositories/InMemoryProductRepository.js';
import InMemoryInspectionRepository from '../../../../src/infrastructure/repositories/InMemoryInspectionRepository.js';
import Product from '../../../../src/domain/product/Product.js';
import Inspection from '../../../../src/domain/inspection/Inspection.js';

describe('ProductInspectionService', () => {
  let productRepository;
  let inspectionRepository;
  let service;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    inspectionRepository = new InMemoryInspectionRepository();
    service = new ProductInspectionService(productRepository, inspectionRepository);
  });

  afterEach(() => {
    productRepository.clear();
    inspectionRepository.clear();
  });

  it('should be created with required repositories', () => {
    expect(() => new ProductInspectionService()).toThrow('ProductRepository and InspectionRepository are required.');
    expect(() => new ProductInspectionService(productRepository)).toThrow('ProductRepository and InspectionRepository are required.');
    expect(() => new ProductInspectionService(productRepository, inspectionRepository)).toBeInstanceOf(ProductInspectionService);
  });

  describe('performInspection', () => {
    // Given a finished product, when inspection occurs, then defects are identified
    it('Given a finished product, when inspection occurs, then defects are identified', async () => {
      // Given: a finished product
      const product = Product.createFinishedProduct('Test Product', new Date());
      await productRepository.save(product);
      expect(product.status).toBe('FINISHED');

      // When: inspection occurs with defects
      const defectsData = [
        { description: 'Minor scratch', severity: 'LOW' },
        { description: 'Missing part', severity: 'CRITICAL' },
      ];
      const { product: updatedProduct, inspection } = await service.performInspection(product.id, defectsData);

      // Then: defects are identified and product status is updated
      expect(updatedProduct).toBeInstanceOf(Product);
      expect(updatedProduct.id).toBe(product.id);
      expect(updatedProduct.status).toBe('INSPECTED_DEFECTIVE');
      expect(updatedProduct.inspectionId).toBe(inspection.id);

      expect(inspection).toBeInstanceOf(Inspection);
      expect(inspection.productId).toBe(product.id);
      expect(inspection.defects).toHaveLength(2);
      expect(inspection.hasDefects()).toBe(true);
      expect(inspection.defects[0].description).toBe('Minor scratch');
      expect(inspection.defects[1].severity).toBe('CRITICAL');

      // Verify persistence
      const persistedProduct = await productRepository.findById(product.id);
      expect(persistedProduct.status).toBe('INSPECTED_DEFECTIVE');
      expect(persistedProduct.inspectionId).toBe(inspection.id);

      const persistedInspection = await inspectionRepository.findById(inspection.id);
      expect(persistedInspection.id).toBe(inspection.id);
      expect(persistedInspection.defects).toHaveLength(2);
    });

    it('should mark product as INSPECTED_OK if no defects are found', async () => {
      const product = Product.createFinishedProduct('Another Product', new Date());
      await productRepository.save(product);

      const { product: updatedProduct, inspection } = await service.performInspection(product.id, []);

      expect(updatedProduct.status).toBe('INSPECTED_OK');
      expect(inspection.hasDefects()).toBe(false);
      expect(inspection.defects).toHaveLength(0);

      const persistedProduct = await productRepository.findById(product.id);
      expect(persistedProduct.status).toBe('INSPECTED_OK');
    });

    it('should throw an error if product is not found', async () => {
      await expect(service.performInspection('non-existent-id', [])).rejects.toThrow(
        'Product with ID non-existent-id not found.'
      );
    });

    it('should throw an error if product is not in FINISHED status', async () => {
      const product = Product.createFinishedProduct('Draft Product', new Date());
      product.status = 'DRAFT'; // Manually change status
      await productRepository.save(product);

      await expect(service.performInspection(product.id, [])).rejects.toThrow(
        `Product ${product.id} must be in 'FINISHED' status to be inspected.`
      );
    });

    it('should handle empty defects array gracefully', async () => {
      const product = Product.createFinishedProduct('Empty Defects Test', new Date());
      await productRepository.save(product);

      const { product: updatedProduct, inspection } = await service.performInspection(product.id, []);

      expect(updatedProduct.status).toBe('INSPECTED_OK');
      expect(inspection.defects).toHaveLength(0);
    });

    it('should throw an error for invalid defect severity', async () => {
      const product = Product.createFinishedProduct('Invalid Defect Test', new Date());
      await productRepository.save(product);

      const invalidDefects = [{ description: 'Bad defect', severity: 'INVALID' }];

      await expect(service.performInspection(product.id, invalidDefects)).rejects.toThrow(
        'Invalid defect severity. Must be LOW, MEDIUM, HIGH, or CRITICAL.'
      );
    });
  });
});