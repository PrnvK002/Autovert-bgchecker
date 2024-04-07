import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const url = process.env.MONGO_URL!;
    const conn = await mongoose.connect(url);
    console.log(`mongodb connected ${conn.connection.host}`);
  } catch (err: any) {
    console.error(`Error on connection mongodb: ${err.message}`, err);
    process.exit(1);
  }
};

export default connectDB;
