import Product from '../domain/product/Product.js';

class ProductApplicationService {
  constructor(productRepository, productInspectionService) {
    this.productRepository = productRepository;
    this.productInspectionService = productInspectionService;
  }

  async createProduct(name, manufacturingDate) {
    const product = Product.createFinishedProduct(name, manufacturingDate);
    await this.productRepository.save(product);
    return product;
  }

  async getProduct(productId) {
    return this.productRepository.findById(productId);
  }

  async inspectProduct(productId, defectsData) {
    const { product, inspection } = await this.productInspectionService.performInspection(productId, defectsData);
    return { product, inspection };
  }
}

export default ProductApplicationService;