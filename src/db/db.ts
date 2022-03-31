import mongoose from 'mongoose';
/** Connect to Mongo */
mongoose
    .connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log('Mongoose connected');
    })
    .catch((err) => {
        throw err;
    });
const db = mongoose.connection;
export default db;
