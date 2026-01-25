const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, isAdmin, isAbteilungsleiter } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management (Administratoren; Abteilungsleiter dürfen die Benutzerliste lesen)
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of all users
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user ID.
 *                     example: 1
 *                   username:
 *                     type: string
 *                     description: The user's username.
 *                     example: admin
 *                   role:
 *                     type: string
 *                     description: The user's role.
 *                     example: Administrator
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, only Administrators oder Abteilungsleiter können auf diese Ressource zugreifen
 */
router.get('/', [verifyToken, isAbteilungsleiter], userController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user ID.
 *                   example: 1
 *                 username:
 *                   type: string
 *                   description: The user's username.
 *                   example: admin
 *                 role:
 *                   type: string
 *                   description: The user's role.
 *                   example: Administrator
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, only Administrators can access this resource
 *       404:
 *         description: User not found.
 */
router.get('/:id', [verifyToken, isAdmin], userController.getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The new username.
 *                 example: newadmin
 *               password:
 *                 type: string
 *                 description: The new password.
 *                 example: newpassword123
 *               role:
 *                 type: string
 *                 description: The new role.
 *                 enum:
 *                   - Administrator
 *                   - Abteilungsleiter
 *                   - Mitarbeiter
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, only Administrators can access this resource
 *       404:
 *         description: User not found.
 *       409:
 *         description: Username already exists.
 */
router.put('/:id', [verifyToken, isAdmin], userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, only Administrators can access this resource
 *       404:
 *         description: User not found.
 */
router.delete('/:id', [verifyToken, isAdmin], userController.deleteUser);

module.exports = router;