/**
 * @openapi
 * /api/v1/user/profile-image:
 *   patch:
 *     tags: [User]
 *     summary: Upload the authenticated user's profile image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [profileImage]
 *             properties:
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200': {description: Profile image uploaded successfully.}
 *       '400': {description: No file provided.}
 *       '401': {description: Missing or invalid JWT.}
 */
