import * as http from "http";

const host = 'localhost';
const port = 8000;

const users = [
    {id: 1, userName: "vasya", firstName: "Vasiliy", lastName: "Smirnov", email: "vasiliy@gmail.com",
    password: "asda21fg", phone: "0507894563"},
    {id: 2, userName: "petya", firstName: "Peter", lastName: "Vasiliev", email: "petya@gmail.com",
    password: "asda4745g", phone: "0504568974"},
    {id: 3, userName: "kolya", firstName: "Nikolay", lastName: "Nikolaev", email: "nick@gmail.com",
    password: "asdas785g", phone: "0504785263"}
];

function response404(req, res) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(404);
    res.end(`{code: 404, message: "Resource not found"}`);
}

function response500(e, req, res) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(500);
    res.end(JSON.stringify(e));
}

function getUserNameFromURL(req, res) {
    let getNameFromURL = req.url.match(/(?<=user\/).*/g),
        nameFromURL = '',
        userMatch = [];
    if(getNameFromURL) {
        users.forEach(element => {
            if(element.userName === getNameFromURL[0]) {
                nameFromURL = getNameFromURL[0];
                userMatch.push(element);
            };
        });
    }
    return [nameFromURL, userMatch];
}

const requestListener = function (req, res) {
    try {
        switch (req.method) {
            case "GET": 
                libraryGET(req, res);
                break;
            case "POST" :
                libraryPOST(req, res);
                break;
            case "PUT" :
                libraryPUT(req, res);
                break;
            case "DELETE" :
                libraryDelete(req, res);
                break;
            default:
                response404(req, res);
        }
    } catch (e) {
        response500(e, req, res);
    }
}

function libraryGET(req, res) {
    try {
        let getUserName = getUserNameFromURL(req, res);
        switch (req.url) {
            case "/user":
                res.setHeader("Content-Type", "application/json");
                res.writeHead(200);
                res.end(JSON.stringify(users));
                break
            case `/user/${getUserName[0]}` :
                res.setHeader("Content-Type", "application/json");
                res.writeHead(200);
                res.end(JSON.stringify(getUserName[1]));
                break
            default:
                response404(req, res);
        }
    } catch (e) {
        response500(e, req, res);
    }
}

function addUser(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        body = JSON.parse(body);
        if (Array.isArray(body)) { 
            body.forEach((element, index) => {
                element.id = users.length + 1 + index;
            });
            users.push(...body);
        } else {
            body.id = users.length + 1;
            users.push(body);
        }
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify(users));
    })
}

function libraryPOST(req, res) {
    try {
        switch (req.url) {
            case "/user":
                addUser(req, res);
                break
            case '/user/createWithArray' :
                addUser(req, res);
                break
            default:
                response404(req, res);
        }
    } catch (e) {
        response500(e, req, res);
    }
}

function changeUser(req, res, userName) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        body = JSON.parse(body);
        users.forEach((element, index, arr) => {
            if(element.userName === userName) {
                body.id = index + 1;
                arr.splice(index, 1, body);
            }
        })
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify(users));
    })


}

function libraryPUT(req, res) {
    let getUserName = getUserNameFromURL(req, res);
    try {
        switch (req.url) {
            case `/user/${getUserName[0]}`:
                changeUser(req, res, getUserName[0]);
                break;
            default:
                response404(req, res);
        }
    } catch (e) {
        response500(e, req, res);
    }
}

function deleteUser(req, res, userName) {
        users.forEach((element, index, arr) => {
            if(element.userName === userName) {
                arr.splice(index, 1);
                res.setHeader("Content-Type", "application/json");
                res.writeHead(200);
                res.end(JSON.stringify(users));
            }
        })
}

function libraryDelete(req, res) {
    let getUserName = getUserNameFromURL(req, res);
    try {
        switch (req.url) {
            case `/user/${getUserName[0]}`:
                deleteUser(req, res, getUserName[0]);
                break;
            default:
                response404(req, res);
        }
    } catch (e) {
        response500(e, req, res);
    }
}

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
