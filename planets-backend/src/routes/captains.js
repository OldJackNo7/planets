const express = require('express');
const router = express.Router();

const captains = require('../controllers/captains.js');

router.get('/api/captains/:id', captains.getCaptainById);

router.get('/api/captains', captains.getCaptains);

router.post('/api/captains', captains.newCaptain);

router.delete('/api/captains/:id', captains.deleteCaptain);

router.put('/api/captains', captains.updateCaptain);


module.exports = router;