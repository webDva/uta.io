const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

/*
* MongoDB
*/

MongoClient.connect('mongodb://localhost:27017/songdb', (err, db) => {
    if (err)
        throw err;

    const dbo = db.db('songdb');
    dbo.createCollection('songs', {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["musician", "song"],
                properties: {
                    musician: {
                        bsonType: "string"
                    },
                    song: {
                        bsonType: "string"
                    }
                }
            }
        }
    }, (err, res) => {
        if (err)
            throw err;

        db.close();
    });

    const obj1 = {musician: "yotto", song: "yatte"};
    dbo.collection('songs').insertOne(obj1, (err, res) => {
        if (err)
            throw err;
        db.close();
    });
});