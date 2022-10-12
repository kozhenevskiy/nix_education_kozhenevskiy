import * as http from "http";
import {items} from "./products.js";

const host = 'localhost';
const port = 8000;

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

const requestListener = function (req, res) {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        "Access-Control-Allow-Headers": "Content-Type"
    };
    try {
        switch (req.method) {
            case "GET": 
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
                res.setHeader("Content-Type", "application/json");
                res.writeHead(200);
                res.end(JSON.stringify(items));
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