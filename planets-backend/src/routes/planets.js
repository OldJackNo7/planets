const express = require('express');
const router = express.Router();

const planets = require('../controllers/planets.js');

router.get('/api/planets/:id', planets.getPlanetById);

router.get('/api/planets', planets.getPlanets);

router.post('/api/planets', planets.newPlanet);

router.delete('/api/planets/:id', planets.deletePlanet);

router.put('/api/planets', planets.updatePlanet);


module.exports = router;