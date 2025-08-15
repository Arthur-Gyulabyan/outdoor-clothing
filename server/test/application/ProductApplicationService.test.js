import ProductApplicationService from '../../src/application/ProductApplicationService.js';
import InMemoryProductRepository from '../../src/infrastructure/repositories/InMemoryProductRepository.js';
import InMemoryInspectionRepository from '../../src/infrastructure/repositories/InMemoryInspectionRepository.js';
import ProductInspectionService from '../../src/domain/product/services/ProductInspectionService.js';
import Product from '../../src/domain/product/Product.js';

describe('ProductApplicationService', () => {
  let productRepository;
  let inspectionRepository;
  let productInspectionService;
  let productApplicationService;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    inspectionRepository = new InMemoryInspectionRepository();
    productInspectionService = new ProductInspectionService(productRepository, inspectionRepository);
    productApplicationService = new ProductApplicationService(productRepository, productInspectionService);
  });

  afterEach(() => {
    // Clear repositories after each test to ensure isolation
    productRepository.clear();
    inspectionRepository.clear();
  });

  describe('createProduct', () => {
    it('should create a finished product', async () => {
      const productName = 'Test Product';
      const manufacturingDate = new Date();
      const product = await productApplicationService.createProduct(productName, manufacturingDate);

      expect(product).toBeDefined();
      expect(product.name).toBe(productName);
      expect(product.status).toBe('FINISHED');
      expect(product.manufacturingDate).toEqual(manufacturingDate);

      const foundProduct = await productRepository.findById(product.id);
      expect(foundProduct).toEqual(product);
    });
  });

  describe('getProduct', () => {
    it('should retrieve an existing product', async () => {
      const product = Product.createFinishedProduct('Existing Product', new Date());
      await productRepository.save(product);

      const foundProduct = await productApplicationService.getProduct(product.id);
      expect(foundProduct).toEqual(product);
    });

    it('should return null if product does not exist', async () => {
      const foundProduct = await productApplicationService.getProduct('non-existent-id');
      expect(foundProduct).toBeNull();
    });
  });

  describe('inspectProduct', () => {
    // Given a finished product, when inspection occurs, then defects are identified
    it('Given a finished product, when inspection occurs, then defects are identified', async () => {
      // Given: a finished product
      const productName = 'Widget X';
      const manufacturingDate = new Date();
      const product = await productApplicationService.createProduct(productName, manufacturingDate);
      expect(product.status).toBe('FINISHED');

      // When: inspection occurs with defects
      const detectedDefects = [
        { description: 'Scratch on casing', severity: 'LOW' },
        { description: 'Broken LED', severity: 'HIGH' },
      ];
      const { product: updatedProduct, inspection } = await productApplicationService.inspectProduct(
        product.id,
        detectedDefects
      );

      // Then: defects are identified and product status is updated
      expect(updatedProduct.id).toBe(product.id);
      expect(updatedProduct.status).toBe('INSPECTED_DEFECTIVE');
      expect(updatedProduct.inspectionId).toBe(inspection.id);

      expect(inspection).toBeDefined();
      expect(inspection.productId).toBe(product.id);
      expect(inspection.hasDefects()).toBe(true);
      expect(inspection.defects).toHaveLength(2);
      expect(inspection.defects[0].description).toBe('Scratch on casing');
      expect(inspection.defects[1].severity).toBe('HIGH');

      const persistedProduct = await productRepository.findById(product.id);
      expect(persistedProduct.status).toBe('INSPECTED_DEFECTIVE');
      expect(persistedProduct.inspectionId).toBe(inspection.id);

      const persistedInspection = await inspectionRepository.findById(inspection.id);
      expect(persistedInspection.id).toBe(inspection.id);
      expect(persistedInspection.defects).toHaveLength(2);
    });

    it('should successfully inspect a product with no defects', async () => {
      const product = await productApplicationService.createProduct('Perfect Widget', new Date());

      const { product: updatedProduct, inspection } = await productApplicationService.inspectProduct(product.id, []);

      expect(updatedProduct.status).toBe('INSPECTED_OK');
      expect(inspection.hasDefects()).toBe(false);
      expect(inspection.defects).toHaveLength(0);

      const persistedProduct = await productRepository.findById(product.id);
      expect(persistedProduct.status).toBe('INSPECTED_OK');
    });

    it('should throw an error if product is not found', async () => {
      await expect(productApplicationService.inspectProduct('non-existent-id', [])).rejects.toThrow(
        'Product with ID non-existent-id not found.'
      );
    });

    it('should throw an error if product is not in FINISHED status', async () => {
      const product = Product.createFinishedProduct('Almost Done', new Date());
      product.status = 'IN_PRODUCTION'; // Manually set to a non-finished status
      await productRepository.save(product);

      await expect(productApplicationService.inspectProduct(product.id, [])).rejects.toThrow(
        `Product ${product.id} must be in 'FINISHED' status to be inspected.`
      );
    });
  });
});