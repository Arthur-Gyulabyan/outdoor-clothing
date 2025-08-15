import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'given-design-approval-when-order-is-created-then-order-exists.feature'));

defineFeature(feature, test => {
  let context = {};
  const API_BASE_URL = '/api/v1';

  // Use the provided current date for consistency in test data
  const CURRENT_DATE = new Date('2025-08-15T12:26:58.322Z');

  test(
    'Given design approval, when order is created, then order exists',
    ({ given, when, then }) => {
      given('design approval', async () => {
        const designRequest = {
          designTitle: `DesignTitle-${crypto.randomUUID()}`,
          designBrief: `Brief for design-${Date.now()}`,
          styleGuidelines: `Style-${Math.floor(Math.random() * 1000)}`,
          materialType: `Material-${Math.floor(Math.random() * 100)}`,
          colorPreferences: `Color-${Math.floor(Math.random() * 100)}`,
          sketchUpload: `sketch-${crypto.randomUUID()}.jpg`,
        };

        const response = await request(app)
          .post(`${API_BASE_URL}/create-design`)
          .send(designRequest)
          .expect(200);

        expect(response.body).toHaveProperty('designSpecID');
        context.designSpecID = response.body.designSpecID; // Store the ID for potential future linking or context.
        context.designRequest = designRequest; // Store for verification if needed
      });

      when('order is created', async () => {
        // Calculate a due date, e.g., 3 months from the current date
        const dueDate = new Date(CURRENT_DATE);
        dueDate.setMonth(dueDate.getMonth() + 3);
        const formattedDueDate = dueDate.toISOString().split('T')[0]; // YYYY-MM-DD

        const productionOrderRequest = {
          orderNumber: `PO-${crypto.randomUUID()}`,
          productDesign: context.designSpecID || `GenericDesign-${crypto.randomUUID()}`, // Link to created design or use a generic one if design wasn't created
          quantityRequired: `${Math.floor(Math.random() * 500) + 100}`,
          dueDate: formattedDueDate,
          factoryLocation: `Factory-${Math.floor(Math.random() * 5) + 1}`,
        };

        const response = await request(app)
          .post(`${API_BASE_URL}/create-production-order`)
          .send(productionOrderRequest)
          .expect(200);

        expect(response.body).toHaveProperty('orderNumber', productionOrderRequest.orderNumber);
        context.createdOrderNumber = response.body.orderNumber;
        context.productionOrderRequest = productionOrderRequest;
      });

      then('order exists', async () => {
        expect(context.createdOrderNumber).toBeDefined();

        const response = await request(app)
          .get(`${API_BASE_URL}/fetch-order-requirements`)
          .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        const foundOrder = response.body.find(
          (order) => order.orderNumber === context.createdOrderNumber
        );
        expect(foundOrder).toBeDefined();
        // Optionally, assert that the found order matches the created data
        expect(foundOrder.productDesign).toBe(context.productionOrderRequest.productDesign);
        expect(foundOrder.quantityRequired).toBe(context.productionOrderRequest.quantityRequired);
        expect(foundOrder.dueDate).toBe(context.productionOrderRequest.dueDate);
        expect(foundOrder.factoryLocation).toBe(context.productionOrderRequest.factoryLocation);
      });
    }
  );
});