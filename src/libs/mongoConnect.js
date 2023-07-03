import mongoose from "mongoose";

export const connectMongoDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }

  return await mongoose.connect(
    "mongodb+srv://yora8807:JqlZswRpM4206CMU@yoradb.9yulg0j.mongodb.net/our-love-journal?retryWrites=true&w=majority"
  );
};
