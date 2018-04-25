let express = require('express');
let cors = require('cors');
let path = require('path');
let bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');

// Multer configuration
const upload = multer({ storage: multer.memoryStorage() })

/*
* MongoDB
*/

const databasename = 'utadb'
const databaseuri = 'mongodb://localhost:27017/'

/*
 * API Server
 */

const app = express();
app.use(cors()); // Needed for file sharing.
// Needed for POST requests.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || '3000';
app.set('port', port);

/*
* Routes
*/

app.post('/addSongs', upload.array('songs'), (req, res) => {
    MongoClient.connect(databaseuri + databasename, (err, db) => {
        if (err)
            throw err;

        const dbo = db.db(databasename);

        req.files.forEach(song => {
            const obj_send_off = { account_id: req.body.account_id, song: song.originalname };
            dbo.collection('songs').insertOne(obj_send_off, (err, res) => {
                if (err)
                    throw err;
            });
        });

        db.close();
    });
});

app.post('/createAccount', (req, res) => {
    MongoClient.connect(databaseuri + databasename, (err, db) => {
        if (err) throw err;

        const dbo = db.db(databasename);

        dbo.collection('accounts').findOne({ email: req.body.email })
            .then(result => {
                if (err) throw err;

                if (result) {
                    db.close();
                    return res.send({ error: true });
                } else {
                    dbo.collection('accounts').insertOne({
                        username: req.body.username,
                        account_id: uuidv4(),
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 12),
                        type: "account"
                    }, (err, res) => { if (err) throw err; });

                    db.close();
                    return res.end();
                }
            }, error => {
                return res.send({ error: true });
            });
    });
});

/*
* Error Handling
*/

app.use(function (err, req, res, next) {
    // more than likely malformed json
    console.log("[ERROR] " + err);
    return res.send({ "failed": "nope.avi" });
});

/*
 * HTTP Server
 */

// Point static path to dist
app.use(express.static(path.join(__dirname, '/frontend/dist')));

// Catch all other routes and return the index file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/dist/index.html'));
});

// Start the HTTP server.
app.listen(port, (err) => {
    if (err) {
        return console.log('[UNEXPECTED MISTAKE] Something bad happened: ', err);
    }

    console.log(`Backend running on port ${port}`);
});