import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'production-need-raw-order-created-materials-ordered.feature'));

defineFeature(feature, test => {
  let productionOrderId;
  let materialOrderData; // To store the request body for material order
  let materialOrderResponse; // To store the actual material order response
  let getMaterialsResponse;

  test(
    'Given production need, when raw order is created, then materials are ordered',
    ({ given, when, then }) => {
      given('production need', async () => {
        const uniqueId = `PROD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const createProductionOrderRequest = {
          orderNumber: uniqueId,
          productDesign: 'Winter Jacket V1',
          quantityRequired: '500',
          dueDate: '2025-12-31',
          factoryLocation: 'Factory B',
        };

        const response = await request(app)
          .post('/api/v1/create-production-order')
          .send(createProductionOrderRequest)
          .expect(200);

        productionOrderId = response.body.orderNumber;
        expect(productionOrderId).toBe(uniqueId);
      });

      when('raw order is created', async () => {
        const uniquePONumber = `MAT-PO-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        materialOrderData = {
          pONumber: uniquePONumber,
          materialType: 'GoreTex Pro',
          materialGrade: 'Grade A++',
          quantity: '1000',
          supplierName: 'TechFab Inc.',
          deliveryDate: '2025-11-15',
        };

        materialOrderResponse = await request(app)
          .post('/api/v1/create-material-order')
          .send(materialOrderData)
          .expect(200);

        expect(materialOrderResponse.body.pONumber).toBe(materialOrderData.pONumber);
      });

      then('materials are ordered', async () => {
        getMaterialsResponse = await request(app)
          .get('/api/v1/fetch-inventory-levels')
          .expect(200);

        const foundMaterialOrder = getMaterialsResponse.body.find(
          (order) => order.pONumber === materialOrderData.pONumber
        );

        expect(foundMaterialOrder).toBeDefined();
        expect(foundMaterialOrder).toMatchObject(materialOrderData);
      });
    }
  );
});