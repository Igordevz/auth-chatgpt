import mongoose from "mongoose";
export default async function ConectionDB() {
  try {
   await mongoose.connect(
      `mongodb+srv://${process.env.ACESS_DB_USER}:${process.env.ACESS_DB_PASS}@cluster0.h97zn0z.mongodb.net/?retryWrites=true&w=majority`
    );
  } catch (error) {
    console.log(error);
  }
}
