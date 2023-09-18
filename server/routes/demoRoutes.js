const express = require('express');

const router = express.Router();
const {
  getAllDemos,
  createADemo,
  getADemo,
  updateADemo,
  deleteADemo,
} = require('../controllers/demoController');

router.route('/').get(getAllDemos).post(createADemo);

router.route('/:id').get(getADemo).put(updateADemo).delete(deleteADemo);

module.exports = router;
