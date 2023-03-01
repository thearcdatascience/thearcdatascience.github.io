import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import cors from "cors";
import userRouter from "./routes/user.js";
import articleRouter from "./routes/article.js";
import eventRouter from "./routes/event.js";

const app = express();
dotenv.config();

mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDB connected");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

app.use(cors({
  origin: 'http://localhost:3000',
}))


// app.use(
//   cors({
//     origin: "*",
//   })
// );
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use("/api/user", userRouter);
app.use("/api/article", articleRouter);
app.use("/api/event", eventRouter);

//cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.listen(process.env.PORT, () => {
  connect();
  console.log("Listening PORT...");
});
