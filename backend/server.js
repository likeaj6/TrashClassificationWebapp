const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.locals.trashCanId = {
    'test': {
        'detected': false, 'progress': 0, 'userClassification': false
    }
}

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
});

app.get('/pi/feedback/:id', (req, res) => {
    console.log(req.query.classifiction)
    res.send({ express: 'Received'})
    app.locals.trashCanId[req.params.id]['userClassification'] = req.query.classifiction
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
