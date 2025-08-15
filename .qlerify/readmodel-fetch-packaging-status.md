
You will receive the following:
- The current folder structure and tech stacks
- Existing read model-related code files before changes
- A summary of the read model changes

Your Rule:
All request and response schemas, field names, data types, required properties, and descriptions must be strictly derived from the given OpenAPI 3.0.3 specification. Do not invent any data or structure not explicitly defined in the spec. Only implement logic for commands defined in the paths section with HTTP methods

Your task:
1. Generate clean, self-contained read model code reflecting the latest changes.
2. Do NOT include any unchanged files.
3. Ensure:
   - Only read model-related code files can be created/updated/deleted.
   - Place code in: `src/domain/readmodel`, `src/interfaces/http/controllers`
   - Do not touch command or entity code.
   - Must be self-contained and have no cross-domain dependencies.
   - Use only database functions: insert, findAll, findById, update, remove.
   - Controller must export both `routeBase` and `router`.
   - Route must match read model name in lowercase and kebab-case (e.g., '/get-all-todos').
4. Must align with Swagger documentation.

Format:
=== FILE: path/to/file.ext ===
=== TAG: readmodel-<READMODEL_ID> ===
```javascript
< FILE CONTENT HERE >
```

- The `FILE` and `TAG` headers must be written in all uppercase letters, enclosed with triple equals signs (===), exactly as shown.
- Each prefix should be followed by an **given** ID, and both should be joined using a hyphen (-).
  Multiple such tags can be chained together, separated by comma.
- For only deleted code files, add `(deleted)` string at the end of the file path after space.
- Output only the modified or new files — do not include unchanged files.
- No explanation or comments, only file path, tag and code content using the above format.
- Wrap code blocks with triple backticks (` ``` `), specifying the appropriate language.
- Entity name is PascalCased.
- Generate code that strictly matches the provided Swagger (OpenAPI) documentation.

Tech Stacks:
 - Language: JavaScript ESM
 - Framework: JavaScript with Express
 - Test Framework: Jest

Folder Structure:
```bash
server/
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── src/
    ├── bootstrap/
    │   ├── app.js
    │   ├── express.js
    │   └── loader.js
    ├── config/
    │   └── index.js
    ├── docs/
    │   └── .gitkeep
    ├── infrastructure/
    │   └── db/
    │       ├── index.js
    │       ├── memory.js
    │       ├── mongo.js
    │       └── sqlite.js
    ├── interfaces/
    │   └── http/
    │       └── controllers/
    │           ├── .gitkeep
    │           ├── CreateDesignController.js
    │           ├── CreateProductionOrderController.js
    │           ├── CreateMaterialOrderController.js
    │           ├── ScheduleProductionController.js
    │           ├── StartProductionController.js
    │           ├── CompleteProductionController.js
    │           ├── PackageClothingController.js
    │           ├── ShipClothingController.js
    │           ├── FetchDesignBriefController.js
    │           ├── FetchOrderRequirementsController.js
    │           ├── FetchInventoryLevelsController.js
    │           ├── FetchProductionPlanController.js
    │           ├── FetchProductionScheduleController.js
    │           ├── GetWorkStatusController.js
    │           ├── FetchProductionQualityController.js
    │           └── GetInspectionOutcomeController.js
    ├── routes/
    │   └── index.js
    └── domain/
        ├── entity/
        │   ├── DesignSpec.js
        │   ├── ProductionOrder.js
        │   ├── MaterialOrder.js
        │   ├── ProductionSchedule.js
        │   ├── ProductionProcess.js
        │   ├── FinishedProduct.js
        │   ├── PackagedItem.js
        │   └── Shipment.js
        ├── command/
        │   ├── CreateDesignCommand.js
        │   ├── CreateProductionOrderCommand.js
        │   ├── CreateMaterialOrderCommand.js
        │   ├── ScheduleProductionCommand.js
        │   ├── StartProductionCommand.js
        │   ├── CompleteProductionCommand.js
        │   ├── PackageClothingCommand.js
        │   └── ShipClothingCommand.js
        └── readmodel/
            ├── FetchDesignBriefReadModel.js
            ├── FetchOrderRequirementsReadModel.js
            ├── FetchInventoryLevelsReadModel.js
            ├── FetchProductionPlanReadModel.js
            ├── FetchProductionScheduleReadModel.js
            ├── GetWorkStatusReadModel.js
            ├── FetchProductionQualityReadModel.js
            └── GetInspectionOutcomeReadModel.js
```

Route Codes:
=== FILE: root/src/routes/index.js ===
```javascript
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const controllersPath = path.join(__dirname, '../interfaces/http/controllers');

const files = fs.readdirSync(controllersPath);

for (const file of files) {
  if (!file.endsWith('.js')) continue;

  const modulePath = pathToFileURL(path.join(controllersPath, file)).href;
  const controller = await import(modulePath);

  if (controller.default?.router && controller.default?.routeBase) {
    router.use(controller.default.routeBase, controller.default.router);
  }
}

export default router;
```

Example Codes:

=== FILE: src/domain/readmodel/GetAllTodosReadModel.js ===
```javascript
import db from '../../infrastructure/db/index.js';

class GetAllTodosReadModel {
  static async query() {
    return await db.findAll('<entity name here>');
  }
}

export default GetAllTodosReadModel;
```

=== FILE: src/interfaces/http/controllers/GetAllTodosController.js ===
```javascript
import express from 'express';
import GetAllTodosReadModel from '../../../domain/todo/readmodel/GetAllTodosReadModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const todos = await GetAllTodosReadModel.query();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

export default {
  routeBase: '/todos',
  router,
};
```

Old Files:
[]

Old ReadModel Information:
undefined

Current ReadModel Information:
{"id":"3d9a2e9f-cd06-4ef1-912b-d62bade61242","description":"Fetch Packaging Status","cardinality":"one-to-many","dataFields":[{"name":"Packaging Status","type":null},{"name":"Delivery Address","type":null},{"name":"Shipping Options","type":null},{"name":"Carrier Info","type":null}],"gwtDescriptions":["Given packaged items, when shipment is initiated, then delivery begins"]}

Swagger Documentation:
openapi: 3.0.0
info:
  title: Outdoor Clothing API
  version: 1.0.0
  description: API for managing a Shipment.
servers:
  - url: http://localhost:3000
    description: Local Development Server
paths:
  /fetch-packaging-status:
    get:
      summary: Fetch Packaging Status
      tags:
        - Read Models
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: array
                properties:
                  packagingStatus:
                    type: string
                  deliveryAddress:
                    type: string
                  shippingOptions:
                    type: string
                  carrierInfo:
                    type: string
        '400':
          description: Bad Request
      parameters: []
components:
  schemas:
    Shipment:
      type: object
      properties:
        shipmentNo:
          type: string
          example: SHP001
        shipDate:
          type: string
          example: '2023-09-15'
        trackingNo:
          type: string
          example: TRK001
        destAddress:
          type: string
          example: Addr A
        shippingMode:
          type: string
          example: Air
        carrierName:
          type: string
          example: CarrierA


Update the given code files or create new ones if needed.
Output only the updated or newly added code files, excluding any unchanged content.
