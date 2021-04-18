const ObjectId = require('mongodb').ObjectId;
const database = require('./database.js');

const captains = {
    async getAll() {
        const dbo = await database.getDbo();

        return await dbo.collection('captains').find().toArray();
    },

    async search(good) {
        const dbo = await database.getDbo();

        const {id} = good;

        return await dbo.collection('captains').find({_id: new ObjectId(id)}).toArray();
    },

    async create(good) {
        const dbo = await database.getDbo();

        delete good._id;
        delete good.id;

        return (await dbo.collection('captains').insertOne(good)).ops[0];
    },

    async update(good) {
        const dbo = await database.getDbo();

        const {id} = good;

        delete good._id;
        delete good.id;

        return await dbo.collection('captains').findOneAndUpdate({_id: new ObjectId(id)}, {$set: good}, {returnNewDocument: true});
    },

    async delete(good) {
        const dbo = await database.getDbo();

        const {id} = good;

        await dbo.collection('captains').deleteOne({_id: new ObjectId(id)});
    }
}

module.exports = captains;