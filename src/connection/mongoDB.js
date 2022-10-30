import mongoose from 'mongoose';
const mongoDB = "mongodb+srv://kozhenevskiyandrey:geDgcAE3UVaPgzmz@cluster0.2k3b21r.mongodb.net/local_library?retryWrites=true&w=majority";

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {console.log('mongoose connected')})
.catch((err) => {console.log(err)});