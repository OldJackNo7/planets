const status = require('http-status');
const planetsModel = require('../models/planets.js');

const has = require('has-keys');

module.exports = {
    async getPlanetById(req, res) {
        if (!has(req.params, 'id'))
            throw {code: status.BAD_REQUEST, message: 'You must specify the id'};

        let {id} = req.params;

        let data = await planetsModel.search({where: {id}});

        if (!data)
            throw {code: status.BAD_REQUEST, message: 'Planet not found'};

        res.json({status: true, message: 'Returning planet', data});
    },
    async getPlanets(req, res) {
        let data = await planetsModel.getAll();

        res.json({status: true, message: 'Returning planets', data});
    },
    async newPlanet(req, res) {
        if (!has(req.body, ['name', 'description', 'captainId', 'status', 'robots', 'img']))
            throw {code: status.BAD_REQUEST, message: 'You must specify the name, description, captainId, status, robots and the image'};

        let {name, description, captainId, status, robots, img} = req.body;

        await planetsModel.create({name, description, captainId, status, robots, img});

        res.json({status: true, message: 'Planet Added'});
    },
    async updatePlanet(req, res) {
        if (!has(req.body, ['id', 'name', 'description', 'captainId', 'status', 'robots', 'img']))
            throw {code: status.BAD_REQUEST, message: 'You must specify the id, name, description, captainId, status, robots and the image'};

        let {id, name, description, captainId, status, robots, img} = req.body;

        await planetsModel.update({name, description, captainId, status, robots, img}, {where: {id}});

        res.json({status: true, message: 'Planet updated'});
    },
    async deletePlanet(req, res) {
        if (!has(req.params, 'id'))
            throw {code: status.BAD_REQUEST, message: 'You must specify the id'};

        let {id} = req.params;

        await planetsModel.delete({where: {id}});

        res.json({status: true, message: 'Planet deleted'});
    }
}
