import mongoose from 'mongoose';
/** Connect to Mongo */
mongoose
    .connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log('Mongoose connected');
    })
    .catch((err) => {
        throw err;
    });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
