import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDb is connected");
    } catch (err) {
        console.log(err.message);
    }
}

export default connectDb;