import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, './complete-production-process-finalized.feature'));

defineFeature(feature, test => {
  let apiResponse;
  let productionProcessId; // To store the ID of the ongoing production process
  let completedProcessDetails; // To store details of the completion request

  test(
    'Given ongoing production, when completed, then process is finalized',
    ({ given, when, then }) => {
      given('Given ongoing production', async () => {
        // Current date: 2025-08-15T12:27:55.602Z
        const currentTime = '12:30'; // Arbitrary time after start time
        const currentDate = '2025-08-15';

        // 1. Create a Design Spec (prerequisite for Production Order)
        const designSpecRequest = {
          designTitle: `JacketDesign-${Math.random().toString(36).substring(2, 8)}`,
          designBrief: 'High-performance outdoor jacket',
          styleGuidelines: 'Technical, minimalist',
          materialType: 'GoreTex Pro',
          colorPreferences: 'Ocean Blue',
          sketchUpload: `sketch_${Math.random().toString(36).substring(2, 8)}.png`,
        };
        const designSpecResponse = await request(app)
          .post('/api/v1/create-design')
          .send(designSpecRequest)
          .expect(200);

        const designSpecId = designSpecResponse.body.designSpecID;

        // 2. Create a Production Order
        const productionOrderRequest = {
          orderNumber: `PO-${Math.random().toString(36).substring(2, 8)}`,
          productDesign: designSpecId, // Link to the created design
          quantityRequired: '500',
          dueDate: '2025-10-30',
          factoryLocation: 'Shenzhen Factory A',
        };
        await request(app)
          .post('/api/v1/create-production-order')
          .send(productionOrderRequest)
          .expect(200);

        // 3. Schedule Production
        const scheduleProductionRequest = {
          startDate: currentDate,
          endDate: '2025-08-25',
          shiftDetails: 'Day Shift',
          operatorId: `OPR-${Math.random().toString(36).substring(2, 8)}`,
          productionLine: 'Line 3',
        };
        await request(app)
          .post('/api/v1/schedule-production')
          .send(scheduleProductionRequest)
          .expect(200);

        // 4. Start Production (this creates the "ongoing production")
        const startProductionRequest = {
          machineID: `MCH-${Math.random().toString(36).substring(2, 8)}`,
          operatorName: 'John Doe',
          startTime: '08:00',
          batchNo: `BAT-${Math.random().toString(36).substring(2, 8)}`,
          initialCount: '100',
        };
        const startProductionResponse = await request(app)
          .post('/api/v1/start-production')
          .send(startProductionRequest)
          .expect(200);

        productionProcessId = startProductionResponse.body.processID;
        expect(productionProcessId).toBeDefined();
      });

      when('when completed', async () => {
        // Define the details for completing the production
        completedProcessDetails = {
          endTime: '16:00', // Later time than start
          totalUnits: '95', // Example: 95 units produced
          defectsCount: '5', // Example: 5 defects
          qualityReport: 'Pass',
          operatorNote: 'Batch completed successfully, minor defects noted.',
        };

        // Call the complete-production API.
        // Note: The OpenAPI spec for /complete-production does not include
        // processID in its request body. This implies the server implicitly
        // handles which ongoing process to complete, or this operation creates
        // a new completion record. For this test, we assume the server handles
        // the linkage or that the response will reflect the correct processID.
        apiResponse = await request(app)
          .post('/api/v1/complete-production')
          .send(completedProcessDetails)
          .expect(200);
      });

      then('then process is finalized', async () => {
        expect(apiResponse.status).toBe(200);
        expect(apiResponse.body).toBeDefined();

        // Verify that the response includes the processID and completion details.
        // We expect the processID in the response to match the one started earlier,
        // although the API itself doesn't explicitly link them in the request.
        expect(apiResponse.body.processID).toBe(productionProcessId);
        expect(apiResponse.body.endTime).toBe(completedProcessDetails.endTime);
        expect(apiResponse.body.totalUnits).toBe(completedProcessDetails.totalUnits);
        expect(apiResponse.body.defectsCount).toBe(completedProcessDetails.defectsCount);
        expect(apiResponse.body.qualityReport).toBe(completedProcessDetails.qualityReport);
        expect(apiResponse.body.operatorNote).toBe(completedProcessDetails.operatorNote);

        // Further verification can be done by fetching the status of the process
        // if a specific API for "get production process by ID" existed and was implemented.
        // Since get-work-status returns all processes, we would need to filter by ID.
        const workStatusResponse = await request(app)
          .get('/api/v1/get-work-status')
          .expect(200);

        const finalizedProcess = workStatusResponse.body.find(
          (process) => process.processID === productionProcessId
        );

        expect(finalizedProcess).toBeDefined();
        expect(finalizedProcess.endTime).toBe(completedProcessDetails.endTime);
        expect(finalizedProcess.totalUnits).toBe(completedProcessDetails.totalUnits);
        expect(finalizedProcess.qualityReport).toBe('Pass'); // "finalized" implies a successful completion state
      });
    }
  );
});