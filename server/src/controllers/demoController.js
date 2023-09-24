import logger from '../utils/logger.js';
import knex from '../db/db.js';
import redis from '../utils/redis.js';

// @desc Get all Demos
// @route GET /api/demo
// @access public
const getAllDemos = async (req, res) => {
  try {
    const redisData = await redis.get('latestdemos');
    if (redisData) {
      return res.json({ source: 'redis', data: JSON.parse(redisData) });
    }
    const pgData = await knex.select().from('demos');
    // EX stands for time to live which is 10 seconds
    await redis.set('latestdemos', JSON.stringify(pgData), 'EX', 10);
    res.status(200).json({ source: 'postgres', message: pgData });
    logger.log('info', 'success');
  } catch (error) {
    logger.log('error', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// @desc Create a New Demo
// @route POST /api/demo
// @access public
const createADemo = (req, res) => {
  console.log(req.body);
  // let demo = [];
  // demo = [req.body, ...demo];
  knex('demos')
    .insert({
      first_name: 'jeril',
      last_name: 'jose',
    })
    .then(() => {
      knex
        .select()
        .from('demos')
        .then((demos) => {
          res.send(demos);
        });
    });
};

// @desc Get A Demo
// @route GET /api/demo/:id
// @access public
const getADemo = (req, res) => {
  res.status(200).json({ message: 'Get A Demo' });
};

// @desc Update A Demo
// @route PUT /api/demo/:id
// @access public
const updateADemo = (req, res) => {
  res.status(200).json({ message: 'Update A Demo' });
};

// @desc Delete A Demo
// @route DELETE /api/demo/:id
// @access public
const deleteADemo = (req, res) => {
  res.status(200).json({ message: 'Delete A Demo' });
};

export { getAllDemos, createADemo, getADemo, updateADemo, deleteADemo };
