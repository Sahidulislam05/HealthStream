/**
 * @openapi
 * /api/v1/doctor/apply-as-doctor:
 *   post:
 *     tags: [Doctors]
 *     security: []
 *     summary: Apply to become a doctor
 *     description: Multipart form data. Numeric fields must be sent as values that the server can coerce to numbers.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [user, doctor, resume]
 *             properties:
 *               user: {type: string, description: JSON object containing name and email}
 *               doctor: {type: string, description: JSON object containing specialization, licenseNumber, qualifications, experienceYears, bio, consultationFee, and contactNumber}
 *               resume: {type: string, format: binary}
 *               additionalFiles: {type: array, items: {type: string, format: binary}, maxItems: 10}
 *     responses:
 *       '201': {description: Doctor application submitted; verification email sent.}
 *       '400': {description: Invalid form data or missing resume.}
 * /api/v1/doctor/apply-as-doctor/verify-email:
 *   post:
 *     tags: [Doctors]
 *     security: []
 *     summary: Verify a doctor application email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, otp]
 *             properties:
 *               email: {type: string, format: email}
 *               otp: {type: string, minLength: 6, maxLength: 6}
 *     responses:
 *       '200': {description: Doctor application email verified.}
 *       '400': {description: Invalid or expired OTP.}
 * /api/v1/doctor/approve-doctor:
 *   post:
 *     tags: [Doctors]
 *     summary: Approve or reject a doctor application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Approval payload accepted by the doctor controller.
 *     responses:
 *       '200': {description: Doctor application decision saved.}
 *       '401': {description: Admin or super-admin authentication required.}
 * /api/v1/doctor/all-doctors:
 *   get:
 *     tags: [Doctors]
 *     summary: List doctors for administrators
 *     responses:
 *       '200': {description: Doctor list., content: {application/json: {schema: {type: array, items: {$ref: '#/components/schemas/Doctor'}}}}}
 *       '401': {description: Admin or super-admin authentication required.}
 * /api/v1/doctor/update-my-profile:
 *   patch:
 *     tags: [Doctors]
 *     summary: Update the authenticated doctor's profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address: {type: string, minLength: 5}
 *               bio: {type: string, maxLength: 1000}
 *               consultationFee: {type: number, minimum: 0}
 *               contactNumber: {type: string, minLength: 5}
 *     responses:
 *       '200': {description: Doctor profile updated.}
 *       '401': {description: Doctor authentication required.}
 * /api/v1/doctor/public/available-today:
 *   get:
 *     tags: [Doctors]
 *     security: []
 *     summary: List doctors available today
 *     responses:
 *       '200': {description: Public list of doctors available today.}
 * /api/v1/doctor/public/all-doctors:
 *   get:
 *     tags: [Doctors]
 *     security: []
 *     summary: List all public doctor profiles
 *     responses:
 *       '200': {description: Public doctor list., content: {application/json: {schema: {type: array, items: {$ref: '#/components/schemas/Doctor'}}}}}
 * /api/v1/doctor/public/{doctorId}:
 *   get:
 *     tags: [Doctors]
 *     security: []
 *     summary: Get a public doctor profile
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema: {type: string, format: uuid}
 *     responses:
 *       '200': {description: Public doctor profile., content: {application/json: {schema: {$ref: '#/components/schemas/Doctor'}}}}
 *       '404': {description: Doctor not found.}
 */
