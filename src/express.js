// const userController = require('./controller/userController.js')
// const user1Controller = require('./controller/user1Controller.js')
// const express = require('express')
// const app = express()
// const logger = require('morgan');
// const testMongoConnection = require("./connection/mongoDB");

// const host = '127.0.0.1'
// const port = 3000

// testMongoConnection()
//     .catch((e)=>console.log(e));

// /*
// app.use((req, res, next) => {
//     res.status(404).type('text/plain')
//     res.send('Not found')
// })
// */

// /*
// const someVar = express.Router();

// someVar.ro
// */

// // An example middleware function
// const a_middleware_function = function(req, res, next) {
//   // ... perform some operations
//     console.log('im middleware function ')
//     next(); // Call next() so Express will call the next middleware function in the chain.
// }




// //app.use(logger('dev'));
// //app.use(a_middleware_function)


// app.use('/test', userController)
// app.use('/newTest', user1Controller)

// function errorHandler (err, req, res, next) {
//     if (res.headersSent) {
//         retu
