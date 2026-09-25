/**
 * @openapi
 * /api/v1/analytics/patient-analytics:
 *   get:
 *     tags: [Analytics]
 *     summary: Get patient analytics
 *     responses:
 *       '200': {description: Analytics for the authenticated patient.}
 *       '401': {description: Patient authentication required.}
 * /api/v1/analytics/doctor-analytics:
 *   get:
 *     tags: [Analytics]
 *     summary: Get doctor analytics
 *     responses:
 *       '200': {description: Analytics for the authenticated doctor.}
 *       '401': {description: Doctor authentication required.}
 * /api/v1/analytics/admin-analytics:
 *   get:
 *     tags: [Analytics]
 *     summary: Get administrator analytics
 *     responses:
 *       '200': {description: Platform analytics for administrators.}
 *       '401': {description: Admin or super-admin authentication required.}
 */
