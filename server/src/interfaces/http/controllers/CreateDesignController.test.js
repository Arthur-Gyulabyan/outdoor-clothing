import request from 'supertest';
import express from 'express';
import CreateDesignController from './CreateDesignController.js';
import CreateDesignCommand from '../../../domain/command/CreateDesignCommand.js';

jest.mock('../../../domain/command/CreateDesignCommand.js', () => ({
  execute: jest.fn(),
}));

describe('CreateDesignController', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use(CreateDesignController.routeBase, CreateDesignController.router);
  });

  beforeEach(() => {
    CreateDesignCommand.execute.mockClear();
  });

  test('should create a design and return the spec when given a valid brief', async () => {
    const mockDesignData = {
      designTitle: 'Eco-Friendly Smart Home',
      designBrief: 'A futuristic home focusing on sustainability and AI integration.',
      styleGuidelines: 'Minimalist, green, futuristic',
      materialType: 'Recycled polymers, sustainable wood',
      colorPreferences: 'Earthy tones, metallic accents',
      sketchUpload: 'http://example.com/sketch.jpg',
    };

    const mockDesignSpec = {
      designSpecID: 'mock-uuid-123',
      ...mockDesignData,
    };
    CreateDesignCommand.execute.mockResolvedValue(mockDesignSpec);

    const response = await request(app)
      .post(CreateDesignController.routeBase)
      .send(mockDesignData)
      .expect(200);

    expect(CreateDesignCommand.execute).toHaveBeenCalledTimes(1);
    expect(CreateDesignCommand.execute).toHaveBeenCalledWith(mockDesignData);
    expect(response.body).toEqual(mockDesignSpec);
    expect(response.body.designSpecID).toBeDefined();
    expect(response.body.designTitle).toBe(mockDesignData.designTitle);
  });

  test('should return 400 if CreateDesignCommand fails', async () => {
    const mockDesignData = {
      designTitle: 'Eco-Friendly Smart Home',
      designBrief: 'A futuristic home focusing on sustainability and AI integration.',
      styleGuidelines: 'Minimalist, green, futuristic',
      materialType: 'Recycled polymers, sustainable wood',
      colorPreferences: 'Earthy tones, metallic accents',
      sketchUpload: 'http://example.com/sketch.jpg',
    };

    const errorMessage = 'Invalid design parameters';
    CreateDesignCommand.execute.mockRejectedValue(new Error(errorMessage));

    const response = await request(app)
      .post(CreateDesignController.routeBase)
      .send(mockDesignData)
      .expect(400);

    expect(CreateDesignCommand.execute).toHaveBeenCalledTimes(1);
    expect(CreateDesignCommand.execute).toHaveBeenCalledWith(mockDesignData);
    expect(response.body).toEqual({ message: errorMessage });
  });
});