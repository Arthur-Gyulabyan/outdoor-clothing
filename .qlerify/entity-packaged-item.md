
You will receive the following:
- The current folder structure and tech stacks
- Existing entity-related code files before changes
- A summary of the entity changes

Your Rule:
All request and response schemas, field names, data types, required properties, and descriptions must be strictly derived from the given OpenAPI 3.0.3 specification. Do not invent any data or structure not explicitly defined in the spec. Only implement logic for commands defined in the paths section with HTTP methods

Your task:
1. Generate clean, self-contained entity code reflecting the latest updates.
2. Do NOT include any unchanged files.
3. Ensure:
   - Only entity-related code files can be created/updated.
   - Each entity must reside in `src/domain/entity`
   - No references to command or read model code.
   - Entity code must follow the example coding style.
   - Must be self-contained and have no imports from other domains.
   - Must be compatible with Swagger specifications.
   - Use `uuid` for generating IDs where needed.
   - Always store the primary key as `id` internally and expose both `id` and its original API field name in the response.

Format:
=== FILE: path/to/file.ext ===
=== TAG: entity-<ENTITY_ID> ===
```javascript
< FILE CONTENT HERE >
```

- The `FILE` and `TAG` headers must be written in all uppercase letters, enclosed with triple equals signs (===), exactly as shown.
  Each prefix should be followed by an **given** ID, and both should be joined using a hyphen (-).
  Multiple such tags can be chained together, separated by comma.
- Output only the modified or new files — do not include unchanged files.
- No explanation or comments, only file path, tag and code content using the above format.
- Wrap code blocks with triple backticks (` ``` `), specifying the appropriate language.
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
    │           └── .gitkeep
    ├── routes/
    │   └── index.js
    └── domain/
        └── entity/
            ├── DesignSpec.js
            ├── ProductionOrder.js
            ├── MaterialOrder.js
            ├── ProductionSchedule.js
            ├── ProductionProcess.js
            └── FinishedProduct.js
```

Example Codes:

=== FILE: src/domain/entity/Todo.js ===
```javascript
import { v4 as uuidv4 } from 'uuid';

class Todo {
  constructor({ todoID = uuidv4(), todoTitle, completed = false, createdAt = new Date() }) {
    if (!todoTitle) throw new Error('Title is required');
    this.id = todoID;
    this.todoID = todoID;
    this.todoTitle = todoTitle;
    this.completed = completed;
    this.createdAt = createdAt;
  }

  toJSON() {
    return {
      id: this.id,
      todoID: this.todoID,
      todoTitle: this.todoTitle,
      completed: this.completed,
      createdAt: this.createdAt
    };
  }
}

export default Todo;
```

Old Files:
[]

Old {{ PROMPT_TYPE }} Information:
undefined

Current {{ PROMPT_TYPE }} Information:
{"id":"baa2c738-3ea2-4632-9d90-7daef7091c5a","name":"Packaged Item","dataFields":[{"name":"Package ID","exampleData":["PKG001","PKG002","PKG003"],"cardinality":"one-to-one","primaryKey":true},{"name":"Packaging Date","exampleData":["2023-09-10","2023-09-11","2023-09-12"],"cardinality":"one-to-one","primaryKey":false},{"name":"Box Type","exampleData":["BoxA","BoxB","BoxC"],"cardinality":"one-to-one","primaryKey":false},{"name":"Seal Status","exampleData":["Sealed","NotSealed","Sealed"],"cardinality":"one-to-one","primaryKey":false},{"name":"Packaged Qty","exampleData":["90","85","95"],"cardinality":"one-to-one","primaryKey":false},{"name":"Comments","exampleData":["None","Fragile","Handle with care"],"cardinality":"one-to-one","primaryKey":false}]}

Swagger Documentation:
openapi: 3.0.0
info:
  title: Outdoor Clothing API
  version: 1.0.0
  description: API for managing a Packaged Item.
servers:
  - url: http://localhost:3000
    description: Local Development Server
paths: {}
components:
  schemas:
    PackagedItem:
      type: object
      properties:
        packageID:
          type: string
          example: PKG001
        packagingDate:
          type: string
          example: '2023-09-10'
        boxType:
          type: string
          example: BoxA
        sealStatus:
          type: string
          example: Sealed
        packagedQty:
          type: string
          example: '90'
        comments:
          type: string
          example: None


Update the given code files or create new ones if needed.
Output only the updated or newly added code files, excluding any unchanged content.
