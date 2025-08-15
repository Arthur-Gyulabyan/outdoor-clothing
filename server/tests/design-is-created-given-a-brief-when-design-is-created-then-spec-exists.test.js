import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'design-is-created-given-a-brief-when-design-is-created-then-spec-exists.feature'));

defineFeature(feature, test => {
  let createDesignRequestBody;
  let createDesignResponse;
  let createdDesignSpecId;

  test(
    'Given a brief, when design is created, then spec exists',
    ({ given, when, then }) => {
      given('a brief', async () => {
        // Prepare the request body for creating a design
        createDesignRequestBody = {
          designTitle: "Outdoor Trekking Pants",
          designBrief: "Durable, waterproof, and breathable pants for trekking in varied climates.",
          styleGuidelines: "Athletic fit, reinforced knees, multiple pockets, neutral colors.",
          materialType: "Ripstop Nylon",
          colorPreferences: "Black, Olive Green, Grey",
          sketchUpload: "trekking_pants_v1.png",
        };
      });

      when('design is created', async () => {
        // Send a POST request to the /create-design endpoint
        createDesignResponse = await request(app)
          .post('/api/v1/create-design')
          .send(createDesignRequestBody)
          .expect(200); // Expect a 200 OK status
        
        // Store the designSpecID returned from the successful creation
        createdDesignSpecId = createDesignResponse.body.designSpecID;
      });

      then('spec exists', async () => {
        // Assert that the response body contains the expected properties and the created ID
        expect(createDesignResponse.body).toBeDefined();
        expect(createDesignResponse.body.designSpecID).toBeDefined();
        expect(typeof createDesignResponse.body.designSpecID).toBe('string');
        expect(createDesignResponse.body.designTitle).toBe(createDesignRequestBody.designTitle);
        expect(createDesignResponse.body.designBrief).toBe(createDesignRequestBody.designBrief);
        expect(createDesignResponse.body.materialType).toBe(createDesignRequestBody.materialType);
        
        // Optionally, verify that we can fetch this spec (though the current spec only has a general fetch-design-brief)
        // For this scenario, just checking the creation response is sufficient given the "spec exists" phrasing.
      });
    }
  );
});