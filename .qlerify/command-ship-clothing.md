
You will receive the following:
- The current folder structure and tech stacks
- Existing command-related code files before changes
- A summary of the command changes

Your Rule:
All request and response schemas, field names, data types, required properties, and descriptions must be strictly derived from the given OpenAPI 3.0.3 specification. Do not invent any data or structure not explicitly defined in the spec. Only implement logic for commands defined in the paths section with HTTP methods
Use only 200 and 400 as response status codes.

Your task:
1. Generate clean, self-contained command code reflecting the latest updates.
2. Do NOT include any unchanged files.
3. Ensure:
   - Only command-related code files can be created/updated/deleted.
   - Place code in: `src/domain/command`, `src/interfaces/http/controllers`
   - Do not touch entity or read model code.
   - Must be self-contained and have no cross-domain dependencies.
   - Use only database functions: insert, findAll, findById, update, remove and clear.
   - Use `uuid` to generate IDs for Create operations.
   - Controller must export both `routeBase` and `router`.
   - Do not use route parameters — only body-based data allowed.
   - When updating the database, you must use entity class.

Format:
=== FILE: path/to/file.ext ===
=== TAG: command-<COMMAND_ID> ===
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
    │           └── PackageClothingController.js
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
        └── command/
            ├── CreateDesignCommand.js
            ├── CreateProductionOrderCommand.js
            ├── CreateMaterialOrderCommand.js
            ├── ScheduleProductionCommand.js
            ├── StartProductionCommand.js
            ├── CompleteProductionCommand.js
            └── PackageClothingCommand.js
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

=== FILE: src/domain/command/CreateTodoCommand.js ===
```javascript
import Todo from '../entity/Todo.js';
import db from '../../infrastructure/db/index.js';

class CreateTodoCommand {
  static async execute({ title }) {
    const todo = new Todo({ title });
    await db.insert('<entity name here>', todo.toJSON());
    return todo.toJSON();
  }
}

export default CreateTodoCommand;
```

=== FILE: src/interfaces/http/controllers/CreateTodoController.js ===
```javascript
import express from 'express';
import CreateTodoCommand from '../../../domain/todo/command/CreateTodoCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const result = await CreateTodoCommand.execute({ title: req.body.title });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/todos',
  router,
};
```

Old Files:
[]

Old Command Information:
undefined

Current Command Information:
{"id":"25278b48-a6b3-4c45-bb24-7901ad4bc524","description":"Ship Clothing","cardinality":"one-to-many","dataFields":[{"name":"Shipment No","type":null},{"name":"Ship Date","type":null},{"name":"Tracking No","type":null},{"name":"Dest Address","type":null},{"name":"Shipping Mode","type":null},{"name":"Carrier Name","type":null}],"gwtDescriptions":["Given packaged items, when shipment is initiated, then delivery begins"]}

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
  /ship-clothing:
    post:
      summary: Ship Clothing
      tags:
        - Commands
      responses:
        '200':
          description: Success
        '400':
          description: Bad Request
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                shipmentNo:
                  type: string
                shipDate:
                  type: string
                trackingNo:
                  type: string
                destAddress:
                  type: string
                shippingMode:
                  type: string
                carrierName:
                  type: string
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
