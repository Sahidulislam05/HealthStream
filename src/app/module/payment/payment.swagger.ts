/**
 * @openapi
 * /api/v1/payment/my-payments:
 *   get:
 *     tags: [Payments]
 *     summary: List the authenticated patient's payments
 *     responses:
 *       '200': {description: Patient payment list., content: {application/json: {schema: {type: array, items: {$ref: '#/components/schemas/Payment'}}}}}
 *       '401': {description: Patient authentication required.}
 * /api/v1/payment/all-payments:
 *   get:
 *     tags: [Payments]
 *     summary: List all payments
 *     responses:
 *       '200': {description: All payments., content: {application/json: {schema: {type: array, items: {$ref: '#/components/schemas/Payment'}}}}}
 *       '401': {description: Admin or super-admin authentication required.}
 * /api/v1/payment/{paymentId}:
 *   get:
 *     tags: [Payments]
 *     summary: Get a payment by ID
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema: {type: string, format: uuid}
 *     responses:
 *       '200': {description: Payment details., content: {application/json: {schema: {$ref: '#/components/schemas/Payment'}}}}
 *       '401': {description: Authentication required.}
 *       '404': {description: Payment not found.}
 */
