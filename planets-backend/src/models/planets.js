const database = require('./database.js');

const planets = {
    async getAll() {
        const dbo = await database.getDbo();

        return await dbo.collection('planets').find().toArray();
    },

    async search(good) {
        const dbo = await database.getDbo();

        const {_id} = good;

        return await dbo.collection('planets').find({_id: new ObjectId(_id)}).toArray();
    },

    async create(good) {
        const dbo = await database.getDbo();

        delete good._id;
        delete good.id;

        return (await dbo.collection('planets').insertOne(good)).ops[0];
    },

    async update(good) {
        const dbo = await database.getDbo();

        const {_id} = good;

        delete good._id;
        delete good.id;

        return await dbo.collection('planets').findOneAndUpdate({_id: new ObjectId(_id)}, {$set: good}, {returnNewDocument: true});
    },

    async delete(good) {
        const dbo = await database.getDbo();

        const {_id} = good;

        await dbo.collection('users').deleteOne({_id: new ObjectId(_id)});
    }

}


module.exports = planets;