import fs from "fs";
import {User} from '../models/models.js';

function listContacts() {
    return  fs.readFileSync('src/resource/contacts.json', 'utf-8', (err, data) => {
                JSON.stringify(data);
            })
}

const contacts = JSON.parse(listContacts());

function createDB(contacts) {
        contacts.forEach(item => {
            User.create({
                id: item.id,
                name: item.name,
                email: item.email,
                phone: item.phone,
            })
                .catch(err => console.log(err));
        })
}
// if(contacts) createDB(contacts);

async function getUsersDB() {
    let users = await User.find();
    return users;
}

async function getById(req, res, reqId) {
    let body = await getUsersDB();
    if(body.some(item => item.id === reqId)) {
        body.forEach(item => {
            if(item.id === reqId) {
                res.set('Content-Type', 'application/json');
                res.status(200);
                res.send(JSON.stringify(item));
            }
        })
    } else {
        res.set('Content-Type', 'application/json');
        res.status(400);
        res.send({"message": "Contact not found"});
    }
}

async function removeContact(req, res, reqId) {
    let body = await getUsersDB();
    if(body.some(item => item.id === reqId)) {
        body.splice(reqId - 1, 1)
        body.forEach((item, index) => {item.id = index + 1});
        await User.remove().then(createDB(body));
        res.set('Content-Type', 'application/json')
        res.status(200);
        res.send({"message": "Сontact deleted"});
    } else {
        res.set('Content-Type', 'application/json')
        res.status(400);
        res.send({"message": "Contact not found"});
    }
}

async function addContact(req, res) {
    let reqKeys = Object.keys(req.body),
        necessaryKeys = ['name', 'email', 'phone'],
        body = await getUsersDB();
    necessaryKeys.forEach((item, index, arr) => {
        if(reqKeys.includes(item) === false) {
            res.set('Content-Type', 'application/json')
            res.status(400);
            res.send({"message" : "missing required name field"});
        }

        if(reqKeys.includes(item) === true && index === arr.length - 1) {
            let reqData = req.body;
            reqData = Object.assign({id: body.length + 1}, reqData);
            User.create({
                id: reqData.id,
                name: reqData.name,
                email: reqData.email,
                phone: reqData.phone,
            }).catch(err => console.log(err));
            res.set('Content-Type', 'application/json')
            res.status(200);
            res.send(JSON.stringify(reqData));
        }
    })
}

async function updateContact(req, res, reqId) {
    let contact = await User.find()
                                .where('id')
                                .equals(reqId)
                                .then(user => {return user})
                                .catch(err => console.log(err));
        contact = Object.assign({}, contact[0]._doc);
    if(contact) {
        let body = req.body,
            reqKeys = Object.keys(req.body),
            necessaryKeys = ['name', 'email', 'phone'],
            changingKeys = [];
        reqKeys.forEach(item => {
            if(necessaryKeys.some(key => key === item)) {changingKeys.push(item);};
        })
        if(changingKeys.length > 0) {
            changingKeys.forEach(item => {
                contact[item] = body[item];
            })
            User.updateOne({id: contact.id}, contact)
                .then(() => {
                    res.set('Content-Type', 'application/json');
                    res.status(200);
                    res.send(JSON.stringify(contact));
                })
        } else {
            res.set('Content-Type', 'application/json')
            res.status(400);
            res.send({"message": "Missing fields"});
        }
    } else {
        res.set('Content-Type', 'application/json')
        res.status(404);
        res.send({"message": "Contact not found"});
    }
}

export {updateContact, addContact, removeContact, getById, getUsersDB};