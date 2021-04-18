const router = require('express').Router();


// Users routes

router.use(require('./user'));
router.use(require('./planets'));
router.use(require('./captains'));


module.exports = router;