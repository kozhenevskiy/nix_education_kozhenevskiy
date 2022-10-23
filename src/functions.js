import fs from "fs";

function listContacts() {
    return  fs.readFileSync('./src/contacts.json', 'utf-8', (err, data) => {
                JSON.stringify(data);
            })
}

function getById(req, res, reqId) {
    let body = JSON.parse(listContacts());
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

function removeContact(req, res, reqId) {
    let body = JSON.parse(listContacts());
    if(body.some(item => item.id === reqId)) {
        body.splice(reqId - 1, 1)
        body.forEach((item, index) => {item.id = index + 1});
        body = JSON.stringify(body);
        fs.writeFileSync('./src/contacts.json', body, (err, data) => {
            if(err)throw err;
        })
        res.set('Content-Type', 'application/json')
        res.status(200);
        res.send({"message": "Сontact deleted"});
    } else {
        res.set('Content-Type', 'application/json')
        res.status(400);
        res.send({"message": "Contact not found"});
    }
}

function addContact(req, res) {
    let reqKeys = Object.keys(req.body),
        necessaryKeys = ['name', 'email', 'phone'];
    necessaryKeys.forEach((item, index, arr) => {
        if(reqKeys.includes(item) === false) {
            res.set('Content-Type', 'application/json')
            res.status(400);
            res.send({"message" : "missing required name field"});
        }

        if(reqKeys.includes(item) === true && index === arr.length - 1) {
            let body = JSON.parse(listContacts()),
            reqData = req.body;
            reqData = Object.assign({id: body.length + 1}, reqData);
            body.push(reqData);
            body = JSON.stringify(body);
            fs.writeFileSync('./src/contacts.json', body, (err, data) => {
                if(err)throw err;
            })
            res.set('Content-Type', 'application/json')
            res.status(200);
            res.send(JSON.stringify(reqData));
        }
    })
}

function updateContact(req, res, reqId) {
    let contacts = JSON.parse(listContacts());
    if(contacts.some(item => item.id === reqId)) {
        let body = req.body,
            reqKeys = Object.keys(req.body),
            necessaryKeys = ['name', 'email', 'phone'],
            changingKeys = [];
        reqKeys.forEach(item => {
            if(necessaryKeys.some(key => key === item)) {changingKeys.push(item);};
        })
        if(changingKeys.length > 0) {
            changingKeys.forEach(item => {
                contacts[reqId - 1][item] = body[item];
            })
            let resp = Object.assign({}, contacts[reqId - 1]);
            contacts = JSON.stringify(contacts);
            fs.writeFileSync('./src/contacts.json', contacts, (err, data) => {
                if(err)throw err;
            })
            res.set('Content-Type', 'application/json')
            res.status(200);
            res.send(JSON.stringify(resp));
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

export {updateContact, addContact, removeContact, getById, listContacts};