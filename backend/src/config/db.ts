import mongoose from 'mongoose';

export class ConnectionDatabase {
    connectDB = async () => {
        try {
            await mongoose.connect("mongodb+srv://paw123:paw123@contactkeeper-8l5c7.mongodb.net/GamerShop?retryWrites=true&w=majority", {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            });
        
            console.log('MongooseDB connected');
        } catch (err) {
            console.error(err.message);
            process.exit(1);
        } 
    }
}