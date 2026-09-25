/**
 * @openapi
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Something went wrong
 *         errorSources:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               path:
 *                 type: string
 *               message:
 *                 type: string
 *     User:
 *       type: object
 *       required: [id, name, email, role, status]
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: PostgreSQL UUID primary key.
 *           example: 550e8400-e29b-41d4-a716-446655440000
 *         name:
 *           type: string
 *           example: Alex Morgan
 *         email:
 *           type: string
 *           format: email
 *           example: alex@example.com
 *         role:
 *           type: string
 *           enum: [PATIENT, DOCTOR, ADMIN, SUPER_ADMIN]
 *         status:
 *           type: string
 *           enum: [ACTIVE, BLOCKED, DELETED]
 *     AuthTokens:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *           description: JWT access token. The API also sets it as an HTTP-only cookie.
 *         refreshToken:
 *           type: string
 *           description: JWT refresh token. The API also sets it as an HTTP-only cookie.
 *     AuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *         data:
 *           oneOf:
 *             - $ref: '#/components/schemas/User'
 *             - $ref: '#/components/schemas/AuthTokens'
 *     Appointment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         patientId:
 *           type: string
 *           format: uuid
 *         doctorId:
 *           type: string
 *           format: uuid
 *         scheduleId:
 *           type: string
 *           format: uuid
 *         status:
 *           type: string
 *           enum: [SCHEDULED, ONGOING, COMPLETED, CANCELLED]
 *         paymentStatus:
 *           type: string
 *     Doctor:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         specialization:
 *           type: string
 *         licenseNumber:
 *           type: string
 *         qualifications:
 *           type: string
 *         experienceYears:
 *           type: integer
 *         consultationFee:
 *           type: number
 *           format: float
 *         bio:
 *           type: string
 *     Schedule:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         startDateTime:
 *           type: string
 *           format: date-time
 *         endDateTime:
 *           type: string
 *           format: date-time
 *         meetingLink:
 *           type: string
 *           format: uri
 *         isBooked:
 *           type: boolean
 *         isPublished:
 *           type: boolean
 *     Payment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         amount:
 *           type: number
 *           format: float
 *         status:
 *           type: string
 *         transactionId:
 *           type: string
 *     Prescription:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         appointmentId:
 *           type: string
 *           format: uuid
 *         findings:
 *           type: string
 *         medicines:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Medicine'
 *     Medicine:
 *       type: object
 *       required: [name, dosage, duration]
 *       properties:
 *         name:
 *           type: string
 *         dosage:
 *           type: string
 *         duration:
 *           type: string
 *         instructions:
 *           type: string
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           type: object
 */

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     tags: [Auth]
 *     security: []
 *     summary: Register a patient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: {type: string, minLength: 3, maxLength: 10}
 *               email: {type: string, format: email}
 *               password: {type: string, format: password, minLength: 8}
 *               patient:
 *                 type: object
 *                 properties:
 *                   contactNumber: {type: string}
 *     responses:
 *       '201': {description: Patient registered; verification OTP sent.}
 *       '400': {description: Invalid registration data.}
 * /api/v1/auth/verify-email:
 *   post:
 *     tags: [Auth]
 *     security: []
 *     summary: Verify a patient email with OTP
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
 *       '200': {description: Email verified.}
 *       '400': {description: Invalid or expired OTP.}
 * /api/v1/auth/login:
 *   post:
 *     tags: [Auth]
 *     security: []
 *     summary: Log in
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: {type: string, format: email}
 *               password: {type: string, format: password}
 *     responses:
 *       '200': {description: Login successful; tokens returned and stored in cookies., content: {application/json: {schema: {$ref: '#/components/schemas/AuthResponse'}}}}
 *       '401': {description: Invalid credentials.}
 * /api/v1/auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Get the authenticated user
 *     responses:
 *       '200': {description: Current user., content: {application/json: {schema: {$ref: '#/components/schemas/AuthResponse'}}}}
 *       '401': {description: Missing or invalid JWT.}
 * /api/v1/auth/refresh-token:
 *   post:
 *     tags: [Auth]
 *     security: []
 *     summary: Refresh access token
 *     description: Uses the refresh token cookie or authorization header.
 *     responses:
 *       '200': {description: New access token issued.}
 *       '401': {description: Missing or invalid refresh token.}
 * /api/v1/auth/forgot-password:
 *   post:
 *     tags: [Auth]
 *     security: []
 *     summary: Request a password reset OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: {type: string, format: email}
 *     responses:
 *       '200': {description: Password reset OTP sent.}
 *       '404': {description: Email not found.}
 * /api/v1/auth/reset-password:
 *   post:
 *     tags: [Auth]
 *     security: []
 *     summary: Reset a password with OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, newPassword, otp]
 *             properties:
 *               email: {type: string, format: email}
 *               newPassword: {type: string, format: password, minLength: 8}
 *               otp: {type: string, minLength: 6, maxLength: 6}
 *     responses:
 *       '200': {description: Password reset successfully.}
 *       '400': {description: Invalid or expired OTP.}
 * /api/v1/auth/google:
 *   post:
 *     tags: [Auth]
 *     security: []
 *     summary: Log in with Google
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [idToken]
 *             properties:
 *               idToken: {type: string}
 *     responses:
 *       '200': {description: Google login successful.}
 *       '401': {description: Invalid Google token.}
 */
