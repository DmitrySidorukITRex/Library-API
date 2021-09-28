const express = require('express');
const controller = require('../controllers/books');
const router = express.Router();

router.get('/', controller.getAll);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;