import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { recipesRouter } from "./routes/recipes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

// Your MongoDB connection string
const connectionString = 'mongodb+srv://goldengliu:GYUZFU40CzVWKg1n@cluster.x1evija.mongodb.net/Cluster?retryWrites=true&w=majority';

// Connect to MongoDB (no need for useNewUrlParser and useUnifiedTopology in recent Mongoose versions)
mongoose.connect(connectionString)
    .then(() => {
        console.log('MongoDB connected');
        // Your server start or additional setup logic goes here
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
