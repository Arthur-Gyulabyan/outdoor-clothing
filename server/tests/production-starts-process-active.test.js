import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'production-starts-process-active.feature'));

defineFeature(feature, test => {
  let apiRequest;
  let response;
  const context = {}; // Use context to share state between steps

  beforeAll(() => {
    apiRequest = request(app);
  });

  test(
    'Given a set schedule, when production starts, then process is active',
    ({ given, when, then }) => {
      given('a set schedule', async () => {
        const scheduleData = {
          startDate: '2025-08-15', // Current date
          endDate: '2025-08-17',
          shiftDetails: 'Day Shift',
          operatorId: 'OPR-GWT-SCHEDULE-001',
          productionLine: 'Assembly Line X'
        };

        response = await apiRequest.post('/api/v1/schedule-production')
          .send(scheduleData)
          .expect(200);

        expect(response.body).toHaveProperty('scheduleID');
        context.scheduleId = response.body.scheduleID;
        // The rest of the properties are verified by the schema, but we can add specific checks if needed
        expect(response.body.startDate).toBe(scheduleData.startDate);
        expect(response.body.endDate).toBe(scheduleData.endDate);
      });

      when('production starts', async () => {
        const productionStartData = {
          machineID: 'MACHINE-GWT-PROD-001',
          operatorName: 'John Doe',
          startTime: '13:00', // After current date 12:27:37.989Z
          batchNo: 'BATCH-GWT-PROD-001',
          initialCount: '150'
        };

        response = await apiRequest.post('/api/v1/start-production')
          .send(productionStartData)
          .expect(200);

        expect(response.body).toHaveProperty('processID');
        context.processId = response.body.processID;
        expect(response.body.machineID).toBe(productionStartData.machineID);
        expect(response.body.operatorName).toBe(productionStartData.operatorName);
        expect(response.body.startTime).toBe(productionStartData.startTime);
        expect(response.body.batchNo).toBe(productionStartData.batchNo);
        expect(response.body.initialCount).toBe(productionStartData.initialCount);
      });

      then('process is active', async () => {
        response = await apiRequest.get('/api/v1/get-work-status')
          .expect(200);

        // Expect the response body to be an array containing the newly started production process
        expect(Array.isArray(response.body)).toBe(true);
        const foundProcess = response.body.find(
          (process) => process.processID === context.processId
        );
        
        expect(foundProcess).toBeDefined();
        // Since ProductionProcess schema doesn't have an explicit 'status',
        // its mere existence in the 'get-work-status' list implies it's active.
        expect(foundProcess).toHaveProperty('processID', context.processId);
      });
    }
  );
});