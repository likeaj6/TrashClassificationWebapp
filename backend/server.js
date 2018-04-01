const express = require('express');
const fetch = require('node-fetch')
const AWS = require('aws-sdk');
const moment = require('moment')
var GoogleSpreadsheet = require('google-spreadsheet');
const spreadsheet = require('./spreadsheets')
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log('SETTING UP AWS CONFIGS')

AWS.config.region = 'us-east-1';
const S3_BUCKET_NAME = process.env.S3_BUCKET;
const s3Bucket = new AWS.S3({params: {Bucket: S3_BUCKET_NAME}} );

const corsOptions = {
    "origin": "*",
    "methods": "GET,POST",
    "allowedHeaders": ['Origin, X-Requested-With, Content-Type, Accept'],
    "credentials": true
}
var doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
var sheet;
var creds_json = {
    client_email: process.env.SHEETS_CLIENT_EMAIL,
    private_key: process.env.SHEETS_PRIVATE_KEY
}

doc.useServiceAccountAuth(creds_json, function() {
    console.log("authenticated")
    doc.getInfo(function(err, info) {
        console.log(info)
        console.log('Loaded doc: '+ info);
        sheet = info.worksheets[0];
        console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
    });
    console.log(doc)
});

app.use(cors(corsOptions));

app.locals.trashCanId = {
    'test': {
        'detected': false, 'progress': 0, 'userClassification': false,
        'mostRecentDatetime': ''
    }
}

app.get('/', (req, res) => {
    // while (!detected) {
    //     continue
    // }

    res.send({'Express': 'Hello!'})
});
//
app.post('/client/images/:id', (req, res) => {
  // this will be moved once testing is complete
    console.log('!!!!RECEIVED IMAGE!!!!')
    var buf = new Buffer(req.body.image.replace(/^data:image\/\w+;base64,/, ""),'base64')
    var imageUri = 'data:image/png;base64,' + req.body.image;
    var dateTime = moment()
    var unixTimestamp = dateTime.unix()
    var dateTimeString = dateTime.format()
    //
    // console.log('FETCHING IMAGE URI')
    // fetch(imageUri).then(function(res){
    //     console.log('turned into blob')
    //     return res.blob()
    // }).then(function(image){
    //     console.log('putting object in bucket')
    var classification = 'Unlabeled'
    if (req.body.classification) {
        classification = req.body.classification + ''
    }


    var data = {
        Key: 'images/' + classification + '/' + dateTimeString,
        Body: buf,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
    };

    const zapierRequest = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            timestamp: dateTimeString,
            id: req.params.id,
            classification: classification
        })
    }
    if (sheet) {
        console.log('adding new row to spreadsheet')
        sheet.addRow({'Timestamp': unixTimestamp, 'Trash Can Id': req.params.id, 'Input': classification}, (error, row) => {
            if (error) {
                console.log('error: ' + error)
            }
            console.log('new row:', row)
        })
    }

    fetch('https://hooks.zapier.com/hooks/catch/2164035/kpafvx/', zapierRequest)


    fetch('https://hooks.zapier.com/hooks/catch/2164035/kpam3c/', zapierRequest)

    s3Bucket.putObject(data, function(err, data){
        if (err) {
            console.log(err);
            console.log('Error uploading data: ', data);
        } else {
            res.send(data);
            console.log('successfully uploaded the image!');
        }
    });
    // })
});

app.get('/client/feedback/:id', (req, res) => {
    // while (!detected) {
    //     continue
    // }
    res.send({ userClassification: app.locals.trashCanId[req.params.id]['userClassification']});
    app.locals.trashCanId[req.params.id]['userClassification'] = false
});

app.get('/client/standby/:id', (req, res) => {
    res.send({ detected: app.locals.trashCanId[req.params.id]['detected']});
    app.locals.trashCanId[req.params.id]['detected'] = false
    app.locals.trashCanId[req.params.id]['userClassification'] = false
});

app.get('/pi/feedback/:id', (req, res) => {
    console.log(req.query.classification)
    res.send({ express: 'Received'})
    app.locals.trashCanId[req.params.id]['userClassification'] = req.query.classification
});

app.get('/pi/detected/:id', (req, res) => {
    console.log(req.params)
    res.send({ express: 'Received'})
    app.locals.trashCanId[req.params.id]['detected'] = true
});

app.get('/client/progress/:id', (req, res) => {
    res.send({ progress: app.locals.trashCanId[req.params.id]['progress']})
    app.locals.detected = true
});

app.get('/pi/update/:id', (req, res) => {
    res.send({ express: 'Received'})
    app.locals.trashCanId[req.params.id]['progress'] = parseInt(req.query.progress)
    console.log(req.query)
});

app.listen(port, () => console.log(`Listening on port ${port}`));
