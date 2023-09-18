const express = require('express');

const router = express.Router();
const {
  getAllDemos,
  createADemo,
  getADemo,
  updateADemo,
  deleteADemo,
} = require('../controllers/demoController');

/**
 * @swagger
 * /api/demo:
 *   get:
 *     summary: Returns an array of objects.
 *     responses:
 *       200:
 *         description: The list of demos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                  message:
 *                   type: string
 */
router.route('/').get(getAllDemos);

/**
 * @swagger
 * /api/demo/:
 *   post:
 *     summary: Create a demo
 *     parameters:
 *     - in: body
 *       name: demo
 *       schema:
 *         type: object
 *         properties:
 *           id:
 *             type: integer
 *           name:
 *             type: string
 *           age:
 *             type: integer
 *           sex:
 *             type: string
 *     responses:
 *       200:
 *         description: The list of demos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                  message:
 *                   type: string
 */
router.route('/').post(createADemo);

/**
 * @swagger
 * /api/demo/:
 *   get:
 *     summary: Get demo by ID
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *       200:
 *         description: The list of demos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                  type: string
 */

router.route('/:id').get(getADemo);
router.route('/:id').put(updateADemo);
router.route('/:id').delete(deleteADemo);

module.exports = router;
