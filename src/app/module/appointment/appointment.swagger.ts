/**
 * @openapi
 * /api/v1/appointment/book-appointment:
 *   post:
 *     tags: [Appointments]
 *     summary: Book an appointment
 *     description: Patient-only endpoint. The requested schedule must be available.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [scheduleId]
 *             properties:
 *               scheduleId: {type: string, format: uuid}
 *     responses:
 *       '201': {description: Appointment booked.}
 *       '400': {description: Schedule is unavailable or request is invalid.}
 *       '401': {description: Patient authentication required.}
 * /api/v1/appointment/pay-appointment:
 *   post:
 *     tags: [Appointments]
 *     summary: Start appointment payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [appointmentId]
 *             properties:
 *               appointmentId: {type: string, format: uuid}
 *     responses:
 *       '200': {description: Payment checkout URL or payment details returned.}
 *       '401': {description: Patient authentication required.}
 *       '404': {description: Appointment not found.}
 * /api/v1/appointment/cancel-appointment:
 *   post:
 *     tags: [Appointments]
 *     summary: Cancel an appointment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [appointmentId]
 *             properties:
 *               appointmentId: {type: string, format: uuid}
 *     responses:
 *       '200': {description: Appointment cancelled.}
 *       '401': {description: Authentication required.}
 *       '404': {description: Appointment not found.}
 * /api/v1/appointment/book-appointment/payment/callback:
 *   get:
 *     tags: [Appointments]
 *     summary: Receive the payment provider callback
 *     description: Callback endpoint used by the payment provider after checkout.
 *     security: []
 *     responses:
 *       '302': {description: Redirect after payment processing.}
 *       '400': {description: Invalid payment callback.}
 * /api/v1/appointment/update-status/{appointmentId}:
 *   patch:
 *     tags: [Appointments]
 *     summary: Update appointment status
 *     parameters:
 *       - $ref: '#/components/parameters/AppointmentId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status: {type: string, enum: [ONGOING, COMPLETED]}
 *     responses:
 *       '200': {description: Appointment status updated.}
 *       '401': {description: Doctor authentication required.}
 *       '404': {description: Appointment not found.}
 * /api/v1/appointment/my-appointments:
 *   get:
 *     tags: [Appointments]
 *     summary: List the authenticated patient's appointments
 *     responses:
 *       '200': {description: Patient appointment list., content: {application/json: {schema: {type: array, items: {$ref: '#/components/schemas/Appointment'}}}}}
 *       '401': {description: Patient authentication required.}
 * /api/v1/appointment/doctor-appointments:
 *   get:
 *     tags: [Appointments]
 *     summary: List appointments assigned to the authenticated doctor
 *     responses:
 *       '200': {description: Doctor appointment list., content: {application/json: {schema: {type: array, items: {$ref: '#/components/schemas/Appointment'}}}}}
 *       '401': {description: Doctor authentication required.}
 * /api/v1/appointment/all-appointments:
 *   get:
 *     tags: [Appointments]
 *     summary: List all appointments
 *     responses:
 *       '200': {description: All appointments., content: {application/json: {schema: {type: array, items: {$ref: '#/components/schemas/Appointment'}}}}}
 *       '401': {description: Admin or super-admin authentication required.}
 * /api/v1/appointment/{appointmentId}:
 *   get:
 *     tags: [Appointments]
 *     summary: Get one appointment
 *     parameters:
 *       - $ref: '#/components/parameters/AppointmentId'
 *     responses:
 *       '200': {description: Appointment details., content: {application/json: {schema: {$ref: '#/components/schemas/Appointment'}}}}
 *       '401': {description: Authentication required.}
 *       '404': {description: Appointment not found.}
 * components:
 *   parameters:
 *     AppointmentId:
 *       in: path
 *       name: appointmentId
 *       required: true
 *       schema: {type: string, format: uuid}
 */
