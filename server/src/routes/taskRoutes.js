const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { verifyToken, isAbteilungsleiter } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieve a list of all tasks
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of tasks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The task ID.
 *                     example: 1
 *                   title:
 *                     type: string
 *                     description: The task title.
 *                     example: Implement user authentication
 *                   description:
 *                     type: string
 *                     description: The task description.
 *                     example: Set up JWT-based authentication for user login.
 *                   dueDate:
 *                     type: string
 *                     format: date
 *                     description: The due date of the task.
 *                     example: 2024-12-31
 *                   done:
 *                     type: boolean
 *                     description: Whether the task is completed.
 *                     example: false
 *                   priority_id:
 *                     type: integer
 *                     description: The ID of the associated priority.
 *                     example: 1
 *                   project_id:
 *                     type: integer
 *                     description: The ID of the associated project.
 *                     example: 1
 *                   user_id:
 *                     type: integer
 *                     description: The ID of the user assigned to the task.
 *                     example: 1
 *       401:
 *         description: Unauthorized
 */
router.get('/', verifyToken, taskController.getAllTasks);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task.
 *                 example: Design database schema
 *               description:
 *                 type: string
 *                 description: The description of the task.
 *                 example: Create ER diagrams and define table structures.
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 description: The due date of the task.
 *                 example: 2024-10-15
 *               done:
 *                 type: boolean
 *                 description: Whether the task is completed.
 *                 example: false
 *               priority_id:
 *                 type: integer
 *                 description: The ID of the associated priority.
 *                 example: 2
 *               project_id:
 *                 type: integer
 *                 description: The ID of the associated project.
 *                 example: 1
 *               user_id:
 *                 type: integer
 *                 description: The ID of the user assigned to the task. (Optional for Mitarbeiter, required for Abteilungsleiter/Administrator when assigning to others)
 *                 example: 1
 *     responses:
 *       201:
 *         description: Task created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the newly created task.
 *                   example: 5
 *                 title:
 *                   type: string
 *                   description: The title of the newly created task.
 *                   example: Design database schema
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, only Abteilungsleiter can create tasks
 */
router.post('/', [verifyToken, isAbteilungsleiter], taskController.createTask);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Retrieve a single task by ID
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the task to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single task.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The task ID.
 *                   example: 1
 *                 title:
 *                   type: string
 *                   description: The task title.
 *                   example: Implement user authentication
 *       404:
 *         description: Task not found.
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', verifyToken, taskController.getTaskById);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the task to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The new title of the task.
 *                 example: Implement user authentication (completed)
 *               description:
 *                 type: string
 *                 description: The new description of the task.
 *                 example: Set up JWT-based authentication for user login and integrate with frontend.
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 description: The new due date of the task.
 *                 example: 2024-09-30
 *               done:
 *                 type: boolean
 *                 description: Whether the task is completed.
 *                 example: true
 *               priority_id:
 *                 type: integer
 *                 description: The ID of the associated priority.
 *                 example: 3
 *               project_id:
 *                 type: integer
 *                 description: The ID of the associated project.
 *                 example: 1
 *               user_id:
 *                 type: integer
 *                 description: The ID of the user assigned to the task. (Optional for Mitarbeiter, required for Abteilungsleiter/Administrator when assigning to others)
 *                 example: 1
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, only Abteilungsleiter can update tasks
 *       404:
 *         description: Task not found.
 */
router.put('/:id', [verifyToken, isAbteilungsleiter], taskController.updateTask);

/**
 * @swagger
 * /tasks/{id}/done:
 *   patch:
 *     summary: Mark a task as done or undone
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the task to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - done
 *             properties:
 *               done:
 *                 type: boolean
 *                 description: The new status of the task (true for done, false for undone).
 *                 example: true
 *     responses:
 *       200:
 *         description: Task status updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task status updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found.
 */
router.patch('/:id/done', verifyToken, taskController.markTaskAsDone);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the task to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, only Abteilungsleiter can delete tasks
 *       404:
 *         description: Task not found.
 */
router.delete('/:id', [verifyToken, isAbteilungsleiter], taskController.deleteTask);

module.exports = router;