const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { verifyToken, isAbteilungsleiter } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management
 */

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Retrieve a list of all projects
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of projects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The project ID.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The project name.
 *                     example: Website Relaunch
 *       401:
 *         description: Unauthorized
 */
router.get('/', verifyToken, projectController.getAllProjects);

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags:
 *       - Projects
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
 *                 description: The name of the project.
 *                 example: New Feature Development
 *     responses:
 *       201:
 *         description: Project created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the newly created project.
 *                   example: 4
 *                 name:
 *                   type: string
 *                   description: The name of the newly created project.
 *                   example: New Feature Development
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, only Abteilungsleiter can create projects
 */
router.post('/', [verifyToken, isAbteilungsleiter], projectController.createProject);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Retrieve a single project by ID
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the project to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single project.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The project ID.
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The project name.
 *                   example: Website Relaunch
 *       404:
 *         description: Project not found.
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', verifyToken, projectController.getProjectById);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Update a project by ID
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the project to update.
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
 *                 description: The new name of the project.
 *                 example: Website Redesign
 *     responses:
 *       200:
 *         description: Project updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Project updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, only Abteilungsleiter can update projects
 *       404:
 *         description: Project not found.
 */
router.put('/:id', [verifyToken, isAbteilungsleiter], projectController.updateProject);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete a project by ID
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the project to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Project deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Project deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, only Abteilungsleiter can delete projects
 *       404:
 *         description: Project not found.
 */
router.delete('/:id', [verifyToken, isAbteilungsleiter], projectController.deleteProject);

module.exports = router;