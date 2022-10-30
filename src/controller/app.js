import express from 'express';
const app = express();
import {updateContact, addContact, removeContact, getById, getUsersDB} from '../service/functions.js';
import '../connection/mongoDB.js';

const host = 'localhost';
const port = 3000;

app.use(express.urlencoded());
app.use(express.json());

app.get('/api/contacts', async (req, res) => {
    let contacts = JSON.stringify(await getUsersDB());
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