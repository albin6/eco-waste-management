import mongoose from "mongoose";

export const mongoConnect = async () => {
  try {
    const dbUri = process.env.MONGO_CONNECTION_STRING;
    if (!dbUri) {
      throw new Error("Invalid DB_URI");
    }
    await mongoose.connect(dbUri);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error);
  }
};
