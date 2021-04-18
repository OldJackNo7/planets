const status = require('http-status');
const captainsModel = require('../models/captains.js');

const has = require('has-keys');

module.exports = {
    async getCaptainById(req, res) {
        if (!has(req.params, 'id'))
            throw {code: status.BAD_REQUEST, message: 'You must specify the id'};

        let {id} = req.params;

        let data = await captainsModel.search({where: {id}});

        if (!data)
            throw {code: status.BAD_REQUEST, message: 'Captain not found'};

        res.json({status: true, message: 'Returning captain', data});
    },
    async getCaptains(req, res) {
        let data = await captainsModel.getAll();

        res.json({status: true, message: 'Returning captains', data});
    },
    async newCaptain(req, res) {
        if (!has(req.body, ['name', 'description', 'img']))
            throw {code: status.BAD_REQUEST, message: 'You must specify the name, description and image'};

        let {name, description, img} = req.body;

        await captainsModel.create({name, description, img});

        res.json({status: true, message: 'Captain Added'});
    },
    async updateCaptain(req, res) {
        if (!has(req.body, ['id', 'name', 'description', 'img']))
            throw {code: status.BAD_REQUEST, message: 'You must specify the id, name, description and image'};

        let {id, name, description, img} = req.body;

        await captainsModel.update({id, name, description, img});

        res.json({status: true, message: 'Captain updated'});
    },
    async deleteCaptain(req, res) {
        if (!has(req.params, 'id'))
            throw {code: status.BAD_REQUEST, message: 'You must specify the id'};

        let {id} = req.params;

        await captainsModel.delete({id});

        res.json({status: true, message: 'Captain deleted'});
    }
}
