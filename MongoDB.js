const { MongoClient } = require('mongodb')
const { MONGODB_URI } = process.env

class MongoDB {
    constructor() {
        this.mongoClient = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        this.db = null
    }

    async connect () {
        const client = await this.mongoClient.connect()
        this.db = client.db().collection('chords')
    }

    async getChords () {
        await this.connect()

        const chords = await this.db.find({}).toArray()
        this.mongoClient.close()

        return chords
    }

    async addChord (root, quality, strings, fingersPosition) {
        await this.connect()

        const newChord = { root, quality, strings, fingersPosition }
        await this.db.insertOne(newChord)

        return newChord
    }


}

module.exports = MongoDB