const express = require('express');
const router = express.Router();

const lecturersController = require('../controllers/lecturersController');

router.get('/', lecturersController.getAll);
router.get('/:id', lecturersController.getById);
router.post('/', lecturersController.create);
router.post('/:id/comments', lecturersController.addComment);
router.patch('/:id', lecturersController.update);
router.delete('/:id', lecturersController.remove);

module.exports = router;
