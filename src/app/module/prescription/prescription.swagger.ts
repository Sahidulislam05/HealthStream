/**
 * @openapi
 * /api/v1/prescription/create-prescription:
 *   post:
 *     tags: [Prescriptions]
 *     summary: Create a prescription
 *     description: Doctor-only endpoint for a completed appointment.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [appointmentId, findings, medicines]
 *             properties:
 *               appointmentId: {type: string, format: uuid}
 *               findings: {type: string, minLength: 5}
 *               medicines:
 *                 type: array
 *                 minItems: 1
 *                 items: {$ref: '#/components/schemas/Medicine'}
 *     responses:
 *       '201': {description: Prescription created.}
 *       '400': {description: Invalid prescription data or appointment not completed.}
 *       '401': {description: Doctor authentication required.}
 * /api/v1/prescription/{appointmentId}:
 *   get:
 *     tags: [Prescriptions]
 *     summary: Get the prescription for an appointment
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema: {type: string, format: uuid}
 *     responses:
 *       '200': {description: Prescription details., content: {application/json: {schema: {$ref: '#/components/schemas/Prescription'}}}}
 *       '401': {description: Authentication required.}
 *       '404': {description: Prescription not found.}
 */
