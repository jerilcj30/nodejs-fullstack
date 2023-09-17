const logger = require('../utils/logger');

//@desc Get all Demos
//@route GET /api/demo
//@access public
const getAllDemos = (req,res) => {
    res.status(200).json({message: 'Get all Demos jeril'})
    logger.log('info', 'success')
}

//@desc Create a New Demo
//@route POST /api/demo
//@access public
const createADemo = (req,res) => {
    console.log(req.body)
    res.status(200).json({message: 'Create A Demo'})
}

//@desc Get A Demo
//@route GET /api/demo/:id
//@access public
const getADemo = (req,res) => {
    res.status(200).json({message: 'Get A Demo'})
}

//@desc Update A Demo
//@route PUT /api/demo/:id
//@access public
const updateADemo = (req,res) => {
    res.status(200).json({message: 'Update A Demo'})
}

//@desc Delete A Demo
//@route DELETE /api/demo/:id
//@access public
const deleteADemo = (req,res) => {
    res.status(200).json({message: 'Delete A Demo'})
}

module.exports = {getAllDemos, createADemo, getADemo, updateADemo, deleteADemo}