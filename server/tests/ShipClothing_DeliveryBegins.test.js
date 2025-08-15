import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, './ShipClothing_DeliveryBegins.feature'));

defineFeature(feature, test => {
  let shipmentRequestPayload;
  let shipmentResponse;
  let packagedItemResponse;

  test(
    'Given packaged items, when shipment is initiated, then delivery begins',
    ({ given, when, then }) => {
      given('packaged items are ready for shipment', async () => {
        // Create a packaged item to satisfy the "Given packaged items" precondition.
        // The shipment API does not explicitly link to package IDs, so creating one
        // generic packaged item is sufficient to meet the scenario's premise.
        const packageId = `PKG-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        const packagingDate = '2025-08-15'; // Current date 2025-08-15 from prompt
        const boxType = 'CorrugatedBox';
        const sealStatus = 'Sealed';
        const packagedQty = '100';
        const comments = 'Ready for dispatch to warehouse.';

        const packagedItemPayload = {
          packageID: packageId,
          packagingDate: packagingDate,
          boxType: boxType,
          sealStatus: sealStatus,
          packagedQty: packagedQty,
          comments: comments,
        };

        packagedItemResponse = await request(app)
          .post('/api/v1/package-clothing')
          .send(packagedItemPayload);

        expect(packagedItemResponse.statusCode).toBe(200);
        expect(packagedItemResponse.body).toBeDefined();
        expect(packagedItemResponse.body.packageID).toBe(packageId);
      });

      when('a shipment is initiated for these items', async () => {
        const shipmentNo = `SHP-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        const trackingNo = `TRK-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        const shipDate = '2025-08-15'; // Current date 2025-08-15 from prompt
        const destAddress = '123 Test Street, Test City, TS 12345';
        const shippingMode = 'Ground';
        const carrierName = 'Global Logistics Inc.';

        shipmentRequestPayload = {
          shipmentNo: shipmentNo,
          shipDate: shipDate,
          trackingNo: trackingNo,
          destAddress: destAddress,
          shippingMode: shippingMode,
          carrierName: carrierName,
        };

        shipmentResponse = await request(app)
          .post('/api/v1/ship-clothing')
          .send(shipmentRequestPayload);
      });

      then('the system confirms that delivery has begun', async () => {
        expect(shipmentResponse.statusCode).toBe(200);
        expect(shipmentResponse.body).toBeDefined();

        // Verify the response matches the initiated shipment details
        expect(shipmentResponse.body.shipmentNo).toBe(shipmentRequestPayload.shipmentNo);
        expect(shipmentResponse.body.shipDate).toBe(shipmentRequestPayload.shipDate);
        expect(shipmentResponse.body.trackingNo).toBe(shipmentRequestPayload.trackingNo);
        expect(shipmentResponse.body.destAddress).toBe(shipmentRequestPayload.destAddress);
        expect(shipmentResponse.body.shippingMode).toBe(shipmentRequestPayload.shippingMode);
        expect(shipmentResponse.body.carrierName).toBe(shipmentRequestPayload.carrierName);

        // Optionally, one could query /fetch-packaging-status to verify the shipment's existence
        // in the system, but the API spec for fetch-packaging-status does not support filtering
        // by shipmentNo, making direct verification challenging without additional API support
        // or clearing database between tests. The 200 OK response with the correct payload
        // is sufficient confirmation for this scenario.
      });
    }
  );
});