class ProductController {
  constructor(productApplicationService) {
    this.productApplicationService = productApplicationService;
  }

  async createProduct(req, res, next) {
    try {
      const { name, manufacturingDate } = req.body;
      const product = await this.productApplicationService.createProduct(name, new Date(manufacturingDate));
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  async getProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.productApplicationService.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  async inspectProduct(req, res, next) {
    // POST /products/:id/inspect
    /**
     * @openapi
     * /products/{id}/inspect:
     *   post:
     *     summary: Perform an inspection on a finished product
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *           format: uuid
     *         required: true
     *         description: The ID of the product to inspect.
     *     requestBody:
     *       required: false
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               defects:
     *                 type: array
     *                 items:
     *                   type: object
     *                   properties:
     *                     description:
     *                       type: string
     *                       description: A description of the defect.
     *                     severity:
     *                       type: string
     *                       enum: [LOW, MEDIUM, HIGH, CRITICAL]
     *                       description: The severity level of the defect.
     *     responses:
     *       200:
     *         description: Product successfully inspected and defects identified (if any).
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 product:
     *                   $ref: '#/components/schemas/Product'
     *                 inspection:
     *                   $ref: '#/components/schemas/Inspection'
     *       400:
     *         description: Invalid input or product not in 'FINISHED' status.
     *       404:
     *         description: Product not found.
     *       500:
     *         description: Internal server error.
     */
    try {
      const { id } = req.params;
      const defectsData = req.body.defects || []; // Expect an array of {description, severity}
      const { product, inspection } = await this.productApplicationService.inspectProduct(id, defectsData);
      res.status(200).json({ product, inspection });
    } catch (error) {
      if (error.message.includes('not found')) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.includes('status')) {
        return res.status(400).json({ message: error.message });
      }
      next(error); // Pass to generic error handler
    }
  }
}

export default ProductController;

/*
  OpenAPI Schema Definitions (conceptual, would be in a separate spec file usually)
  components:
    schemas:
      Product:
        type: object
        properties:
          id:
            type: string
            format: uuid
          name:
            type: string
          status:
            type: string
            enum: [FINISHED, IN_INSPECTION, INSPECTED_OK, INSPECTED_DEFECTIVE]
          manufacturingDate:
            type: string
            format: date-time
          inspectionId:
            type: string
            format: uuid
            nullable: true
      Inspection:
        type: object
        properties:
          id:
            type: string
            format: uuid
          productId:
            type: string
            format: uuid
          inspectionDate:
            type: string
            format: date-time
          defects:
            type: array
            items:
              $ref: '#/components/schemas/Defect'
      Defect:
        type: object
        properties:
          description:
            type: string
          severity:
            type: string
            enum: [LOW, MEDIUM, HIGH, CRITICAL]
*/