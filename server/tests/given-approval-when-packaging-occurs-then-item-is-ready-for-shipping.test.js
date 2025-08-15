import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'given-approval-when-packaging-occurs-then-item-is-ready-for-shipping.feature'));

defineFeature(feature, test => {
  let designSpecId;
  let productionOrderId;
  let materialOrderId;
  let scheduleId;
  let processId;
  let finishedProductId;
  let packageId;
  let packagingResponse;
  let productionBatchNo;
  const currentDate = '2025-08-15'; // Use a consistent date for all entries
  const currentDateTime = '12:28:52'; // Use current time

  test(
    'Given approval, when packaging occurs, then item is ready for shipping',
    ({ given, when, then }) => {
      given('a clothing item has successfully completed production and passed quality inspection', async () => {
        // 1. Create Design
        const designRes = await request(app)
          .post('/api/v1/create-design')
          .send({
            designTitle: 'Arctic Explorer Jacket',
            designBrief: 'Robust winter jacket for extreme conditions.',
            styleGuidelines: 'Classic, functional, durable',
            materialType: 'GoreTex Pro',
            colorPreferences: 'Black, Forest Green',
            sketchUpload: 'arctic_jacket_v1.jpg'
          });
        expect(designRes.statusCode).toBe(200);
        designSpecId = designRes.body.designSpecID;

        // 2. Create Production Order
        const productionOrderRes = await request(app)
          .post('/api/v1/create-production-order')
          .send({
            orderNumber: `PO-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            productDesign: designSpecId,
            quantityRequired: '500',
            dueDate: '2025-09-30',
            factoryLocation: 'Factory B'
          });
        expect(productionOrderRes.statusCode).toBe(200);
        productionOrderId = productionOrderRes.body.orderNumber;

        // 3. Create Material Order (not strictly necessary for the 'approved' state of a *finished product*, but part of the flow)
        const materialOrderRes = await request(app)
          .post('/api/v1/create-material-order')
          .send({
            pONumber: `MO-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            materialType: 'GoreTex Pro',
            materialGrade: 'Grade A',
            quantity: '1000',
            supplierName: 'TechFabric Inc.',
            deliveryDate: '2025-08-25'
          });
        expect(materialOrderRes.statusCode).toBe(200);
        materialOrderId = materialOrderRes.body.pONumber;

        // 4. Schedule Production
        const scheduleProductionRes = await request(app)
          .post('/api/v1/schedule-production')
          .send({
            startDate: currentDate,
            endDate: '2025-08-20',
            shiftDetails: 'Day Shift',
            operatorId: 'OPR005',
            productionLine: 'Line 2'
          });
        expect(scheduleProductionRes.statusCode).toBe(200);
        scheduleId = scheduleProductionRes.body.scheduleID;

        // 5. Start Production
        productionBatchNo = `BATCH-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const startProductionRes = await request(app)
          .post('/api/v1/start-production')
          .send({
            machineID: 'MAC003',
            operatorName: 'John Doe',
            startTime: '08:00',
            batchNo: productionBatchNo,
            initialCount: '100'
          });
        expect(startProductionRes.statusCode).toBe(200);
        processId = startProductionRes.body.processID;

        // 6. Complete Production
        const completeProductionRes = await request(app)
          .post('/api/v1/complete-production')
          .send({
            processID: processId, // Assume processID is known from start production or another context
            endTime: '16:00',
            totalUnits: '98',
            defectsCount: '2',
            qualityReport: 'Pass',
            operatorNote: 'Batch completed successfully with minor rejects.'
          });
        expect(completeProductionRes.statusCode).toBe(200);
        expect(completeProductionRes.body.processID).toBe(processId);

        // 7. Inspect Product (this signifies "approval")
        const inspectProductRes = await request(app)
          .post('/api/v1/inspect-product')
          .send({
            inspectionDate: '2025-08-21',
            inspector: 'Jane Smith',
            batchNo: productionBatchNo,
            defectReport: 'None',
            scoreRating: '95'
          });
        expect(inspectProductRes.statusCode).toBe(200);
        expect(inspectProductRes.body.batchNo).toBe(productionBatchNo);
        finishedProductId = inspectProductRes.body.finishedProdID;
      });

      when('the packaging process is initiated for the approved item', async () => {
        packageId = `PKG-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        packagingResponse = await request(app)
          .post('/api/v1/package-clothing')
          .send({
            packageID: packageId,
            packagingDate: '2025-08-22',
            boxType: 'Standard Clothing Box',
            sealStatus: 'Sealed',
            packagedQty: '98', // Matching total units from complete production
            comments: 'Ready for shipment, tied to batch ' + productionBatchNo
          });
      });

      then('the item should be successfully packaged and marked as ready for shipping', async () => {
        expect(packagingResponse.statusCode).toBe(200);
        expect(packagingResponse.body.packageID).toBe(packageId);
        expect(packagingResponse.body.sealStatus).toBe('Sealed');
        expect(packagingResponse.body.packagedQty).toBe('98');
        expect(packagingResponse.body.comments).toContain(productionBatchNo);

        // Optionally, verify it can be fetched (though not explicitly required by GWT)
        // This is a query, so it's outside the "Then" for the command, but good for confidence.
        // const fetchPackagedItemRes = await request(app)
        //   .get('/api/v1/get-inspection-outcome'); // This query returns an array of PackagedItem. There's no get-by-id.
        // expect(fetchPackagedItemRes.statusCode).toBe(200);
        // expect(fetchPackagedItemRes.body).toBeInstanceOf(Array);
        // const foundPackagedItem = fetchPackagedItemRes.body.find(item => item.packageID === packageId);
        // expect(foundPackagedItem).toBeDefined();
        // expect(foundPackagedItem.sealStatus).toBe('Sealed');
      });
    }
  );
});