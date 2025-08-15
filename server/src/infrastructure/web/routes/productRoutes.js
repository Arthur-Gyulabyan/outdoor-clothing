import { Router } from 'express';
import ProductController from '../controllers/ProductController.js';

// Dependency Injection Setup (in a real app, this would be managed by a DI container)
import InMemoryProductRepository from '../../repositories/InMemoryProductRepository.js';
import InMemoryInspectionRepository from '../../repositories/InMemoryInspectionRepository.js';
import ProductInspectionService from '../../../domain/product/services/ProductInspectionService.js';
import ProductApplicationService from '../../../application/ProductApplicationService.js';

const productRepository = new InMemoryProductRepository();
const inspectionRepository = new InMemoryInspectionRepository();
const productInspectionService = new ProductInspectionService(productRepository, inspectionRepository);
const productApplicationService = new ProductApplicationService(productRepository, productInspectionService);
const productController = new ProductController(productApplicationService);

const router = Router();

router.post('/products', productController.createProduct.bind(productController));
router.get('/products/:id', productController.getProduct.bind(productController));
router.post('/products/:id/inspect', productController.inspectProduct.bind(productController)); // New endpoint

export default router;