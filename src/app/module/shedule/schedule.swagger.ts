/**
 * @openapi
 * /api/v1/schedule/create-schedule:
 *   post:
 *     tags: [Schedules]
 *     summary: Create a doctor schedule
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [startDateTime, endDateTime, meetingLink]
 *             properties:
 *               startDateTime: {type: string, format: date-time}
 *               endDateTime: {type: string, format: date-time}
 *               meetingLink: {type: string, format: uri}
 *     responses:
 *       '201': {description: Schedule created.}
 *       '401': {description: Doctor authentication required.}
 * /api/v1/schedule/my-schedules:
 *   get:
 *     tags: [Schedules]
 *     summary: List the authenticated doctor's schedules
 *     responses:
 *       '200': {description: Doctor schedule list., content: {application/json: {schema: {type: array, items: {$ref: '#/components/schemas/Schedule'}}}}}
 *       '401': {description: Doctor authentication required.}
 * /api/v1/schedule/all-schedules:
 *   get:
 *     tags: [Schedules]
 *     summary: List all schedules
 *     responses:
 *       '200': {description: All schedules., content: {application/json: {schema: {type: array, items: {$ref: '#/components/schemas/Schedule'}}}}}
 *       '401': {description: Admin or super-admin authentication required.}
 * /api/v1/schedule/todays-schedule:
 *   get:
 *     tags: [Schedules]
 *     security: []
 *     summary: List today's published schedules
 *     responses:
 *       '200': {description: Today's available schedules.}
 * /api/v1/schedule/update-schedule/{scheduleId}:
 *   patch:
 *     tags: [Schedules]
 *     summary: Update a schedule
 *     parameters:
 *       - $ref: '#/components/parameters/ScheduleId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDateTime: {type: string, format: date-time}
 *               endDateTime: {type: string, format: date-time}
 *               meetingLink: {type: string, format: uri}
 *     responses:
 *       '200': {description: Schedule updated.}
 *       '401': {description: Doctor authentication required.}
 *       '404': {description: Schedule not found.}
 * /api/v1/schedule/publish-schedule/{scheduleId}:
 *   patch:
 *     tags: [Schedules]
 *     summary: Publish a schedule
 *     parameters:
 *       - $ref: '#/components/parameters/ScheduleId'
 *     responses:
 *       '200': {description: Schedule published.}
 *       '401': {description: Doctor authentication required.}
 * /api/v1/schedule/{scheduleId}:
 *   get:
 *     tags: [Schedules]
 *     summary: Get a schedule by ID
 *     parameters:
 *       - $ref: '#/components/parameters/ScheduleId'
 *     responses:
 *       '200': {description: Schedule details., content: {application/json: {schema: {$ref: '#/components/schemas/Schedule'}}}}
 *       '401': {description: Authentication required.}
 *       '404': {description: Schedule not found.}
 *   delete:
 *     tags: [Schedules]
 *     summary: Delete a schedule
 *     parameters:
 *       - $ref: '#/components/parameters/ScheduleId'
 *     responses:
 *       '200': {description: Schedule deleted.}
 *       '401': {description: Doctor authentication required.}
 *       '404': {description: Schedule not found.}
 * components:
 *   parameters:
 *     ScheduleId:
 *       in: path
 *       name: scheduleId
 *       required: true
 *       schema: {type: string, format: uuid}
 */
