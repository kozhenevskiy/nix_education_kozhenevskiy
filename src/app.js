import express from 'express';
import {updateContact, addContact, removeContact, getById, listContacts} from './functions.js';
const app = express();
// import {testMongoConnection} from './connection/mongoDB';

const host = 'localhost';
const port = 3000;

app.get('/api/contacts', (req, res) => {
    let contacts = listContacts();
    if(contacts) {
        res.set('Content-Type', 'application/json')
        res.status(200);
        res.send(contacts);
    }
});

app.get('/api/contacts/:id', (req, res) => {
    let reqId = +req.params.id;
    getById(req, res, reqId);
});

app.delete('/api/contacts/:id', (req, res) => {
    let reqId = +req.params.id;
    removeContact(req, res, reqId);
});

app.use(express.urlencoded());
app.use(express.json());
app.post('/api/contacts', (req, res) => {
    addContact(req, res);
})

app.put('/api/contacts/:id', (req, res) => {
    let reqId = +req.params.id;
    updateContact(req, res, reqId);
})

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`)
})


