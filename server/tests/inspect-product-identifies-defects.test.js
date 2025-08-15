import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'inspect-product-identifies-defects.feature'));

defineFeature(feature, test => {
  let designSpecId;
  let productionOrderId;
  let scheduleId;
  let processId;
  let batchNo; // This will link production and inspection
  let inspectionResponse;
  const currentDate = '2025-08-15'; // Date for the test, derived from 2025-08-15T12:28:24.247Z

  test(
    'Given a finished product, when inspection occurs, then defects are identified',
    ({ given, when, then }) => {
      given('a finished product', async () => {
        // 1. Create Design
        const createDesignRes = await request(app)
          .post('/api/v1/create-design')
          .send({
            designTitle: `Hiking Jacket ${Date.now()}`,
            designBrief: 'Lightweight and waterproof jacket for hiking.',
            styleGuidelines: 'Minimalist, functional',
            materialType: 'Waterproof Nylon',
            colorPreferences: 'Forest Green',
            sketchUpload: 'hiking_jacket_alpha_sketch.jpg'
          });
        expect(createDesignRes.status).toBe(200);
        designSpecId = createDesignRes.body.designSpecID;
        expect(designSpecId).toBeDefined();

        // 2. Create Production Order
        const createProductionOrderRes = await request(app)
          .post('/api/v1/create-production-order')
          .send({
            orderNumber: `PO-${Date.now()}`, // Unique order number
            productDesign: designSpecId, // Using the designSpecId as the productDesign string
            quantityRequired: '500',
            dueDate: '2025-09-30',
            factoryLocation: 'Shenzhen Plant'
          });
        expect(createProductionOrderRes.status).toBe(200);
        productionOrderId = createProductionOrderRes.body.orderNumber;
        expect(productionOrderId).toBeDefined();

        // 3. Schedule Production
        const scheduleProductionRes = await request(app)
          .post('/api/v1/schedule-production')
          .send({
            startDate: currentDate,
            endDate: '2025-08-20',
            shiftDetails: 'Day Shift',
            operatorId: `OPR-${Date.now()}`,
            productionLine: 'Assembly Line 3'
          });
        expect(scheduleProductionRes.status).toBe(200);
        scheduleId = scheduleProductionRes.body.scheduleID;
        expect(scheduleId).toBeDefined();

        // 4. Start Production
        batchNo = `BATCH-${Date.now()}`; // Unique batch number for this test run
        const startProductionRes = await request(app)
          .post('/api/v1/start-production')
          .send({
            machineID: 'MACH-001',
            operatorName: 'John Doe',
            startTime: '08:00',
            batchNo: batchNo,
            initialCount: '500'
          });
        expect(startProductionRes.status).toBe(200);
        processId = startProductionRes.body.processID;
        expect(processId).toBeDefined();
        // The batchNo from the response should match what we sent
        expect(startProductionRes.body.batchNo).toBe(batchNo);

        // 5. Complete Production (assuming it acts on the last started process and returns its ID)
        const completeProductionRes = await request(app)
          .post('/api/v1/complete-production')
          .send({
            endTime: '16:00',
            totalUnits: '495', // Some units might be rejected
            defectsCount: '5', // Indicate some internal production defects
            qualityReport: 'Minor production defects found',
            operatorNote: 'Experienced minor fabric issues on a few units during assembly.'
          });
        expect(completeProductionRes.status).toBe(200);
        // Verify that this completion is for the process we just started
        expect(completeProductionRes.body.processID).toBe(processId);
        expect(completeProductionRes.body.batchNo).toBe(batchNo);
        expect(completeProductionRes.body.totalUnits).toBe('495'); // Crucial for 'finished product' status
      });

      when('inspection occurs', async () => {
        // Perform final product inspection on the finished product (identified by batchNo)
        const inspectionDefectDescription = 'Small stain on cuff, minor stitching error on one unit.';
        const inspectionScore = '85'; // Lower score due to identified defects

        inspectionResponse = await request(app)
          .post('/api/v1/inspect-product')
          .send({
            inspectionDate: currentDate,
            inspector: 'Jane Smith',
            batchNo: batchNo, // Link to the completed production batch
            defectReport: inspectionDefectDescription, // Explicitly identifying defects here
            scoreRating: inspectionScore
          });
      });

      then('defects are identified', async () => {
        expect(inspectionResponse.status).toBe(200);
        expect(inspectionResponse.body).toBeDefined();
        // Verify the finished product ID and batch number match expectations
        expect(inspectionResponse.body.finishedProdID).toBeDefined();
        expect(inspectionResponse.body.batchNo).toBe(batchNo);
        // Assert that defects were indeed identified and recorded
        expect(inspectionResponse.body.defectReport).toBe('Small stain on cuff, minor stitching error on one unit.');
        expect(inspectionResponse.body.scoreRating).toBe('85');
        expect(inspectionResponse.body.inspector).toBe('Jane Smith');
        expect(inspectionResponse.body.inspectionDate).toBe(currentDate);
      });
    }
  );
});