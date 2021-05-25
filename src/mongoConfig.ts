import mongoose from "mongoose";

const url : string = "mongodb://localhost:27017/PRAAN";
const mongooseConnection = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
    console.info("DB Connected Successfully");
  } catch (error) {
    //   console.log(error)
    console.error("DB Connection Failed");
  }
};

export {mongooseConnection};
