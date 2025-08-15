
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
    │           └── FetchProductionPlanController.js
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
            └── FetchProductionPlanReadModel.js
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
{"id":"ef46df66-27f3-45f2-9401-df9b6a8c93d0","description":"Get Production Schedule","cardinality":"one-to-many","dataFields":[{"name":"Scheduled Batch","type":null},{"name":"Production Order","type":null},{"name":"Shift Start Time","type":null},{"name":"Machine Readiness","type":null}],"gwtDescriptions":["Given a set schedule, when production starts, then process is active"]}

Swagger Documentation:
openapi: 3.0.0
info:
  title: Outdoor Clothing API
  version: 1.0.0
  description: API for managing a Production Process.
servers:
  - url: http://localhost:3000
    description: Local Development Server
paths:
  /get-production-schedule:
    get:
      summary: Get Production Schedule
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
                  scheduledBatch:
                    type: string
                  productionOrder:
                    type: string
                  shiftStartTime:
                    type: string
                  machineReadiness:
                    type: string
        '400':
          description: Bad Request
      parameters: []
components:
  schemas:
    ProductionProcess:
      type: object
      properties:
        processID:
          type: string
          example: PRC001
        machineID:
          type: string
          example: M001
        operatorName:
          type: string
          example: Alice
        startTime:
          type: string
          example: '08:00'
        batchNo:
          type: string
          example: B100
        initialCount:
          type: string
          example: '100'
        endTime:
          type: string
          example: '12:00'
        totalUnits:
          type: string
          example: '110'
        defectsCount:
          type: string
          example: '2'
        qualityReport:
          type: string
          example: Pass
        operatorNote:
          type: string
          example: Good work


Update the given code files or create new ones if needed.
Output only the updated or newly added code files, excluding any unchanged content.
