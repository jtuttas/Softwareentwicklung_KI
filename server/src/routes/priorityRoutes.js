const express = require('express');
const router = express.Router();
const priorityController = require('../controllers/priorityController');
const { verifyToken, isAbteilungsleiter } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Priorities
 *   description: Priority management
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /priorities:
 *   get:
 *     summary: Retrieve a list of all priorities
 *     tags:
 *       - Priorities
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of priorities.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The priority ID.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The priority name.
 *                     example: High
 *       401:
 *         description: Unauthorized
 */
router.get('/', verifyToken, priorityController.getAllPriorities);

/**
 * @swagger
 * /priorities:
 *   post:
 *     summary: Create a new priority
 *     tags:
 *       - Priorities
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the priority.
 *                 example: Urgent
 *     responses:
 *       201:
 *         description: Priority created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the newly created priority.
 *                   example: 4
 *                 name:
 *                   type: string
 *                   description: The name of the newly created priority.
 *                   example: Urgent
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, only Abteilungsleiter can create priorities
 */
router.post('/', [verifyToken, isAbteilungsleiter], priorityController.createPriority);

/**
 * @swagger
 * /priorities/{id}:
 *   get:
 *     summary: Retrieve a single priority by ID
 *     tags:
 *       - Priorities
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the priority to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single priority.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The priority ID.
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The priority name.
 *                   example: High
 *       404:
 *         description: Priority not found.
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', verifyToken, priorityController.getPriorityById);

/**
 * @swagger
 * /priorities/{id}:
 *   put:
 *     summary: Update a priority by ID
 *     tags:
 *       - Priorities
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the priority to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the priority.
 *                 example: Very High
 *     responses:
 *       200:
 *         description: Priority updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Priority updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, only Abteilungsleiter can update priorities
 *       404:
 *         description: Priority not found.
 */
router.put('/:id', [verifyToken, isAbteilungsleiter], priorityController.updatePriority);

/**
 * @swagger
 * /priorities/{id}:
 *   delete:
 *     summary: Delete a priority by ID
 *     tags:
 *       - Priorities
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the priority to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Priority deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Priority deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, only Abteilungsleiter can delete priorities
 *       404:
 *         description: Priority not found.
 */
router.delete('/:id', [verifyToken, isAbteilungsleiter], priorityController.deletePriority);

module.exports = router;