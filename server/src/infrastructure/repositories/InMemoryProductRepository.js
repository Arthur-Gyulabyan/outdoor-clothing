import Product from '../../domain/product/Product.js';
import ProductRepository from '../../domain/product/ProductRepository.js';

class InMemoryProductRepository extends ProductRepository {
  constructor() {
    super();
    this.products = new Map(); // Simulates a database table
  }

  async findById(id) {
    const productData = this.products.get(id);
    if (productData) {
      // Reconstitute the Product object from plain data
      return new Product(productData);
    }
    return null;
  }

  async save(product) {
    // Store product as plain object to avoid circular references if it had methods
    this.products.set(product.id, { ...product });
    return product;
  }

  // For testing purposes to clear the store
  clear() {
    this.products.clear();
  }

  getAll() {
    return Array.from(this.products.values()).map(data => new Product(data));
  }
}

export default InMemoryProductRepository;