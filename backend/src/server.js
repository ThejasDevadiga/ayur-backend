const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const auth = require('./middlewares/authMiddleware')

 
const ConsultantRoutes = require("./routes/Consultant/ConsultantRoutes");
const HelpDeskRoutes = require("./routes/Receptionist/ReceptionistRoutes");
const ManagerRoutes = require("./routes/manager/ManagerRoutes");

const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
dotenv.config();

connectDB();

const app = express();

 

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());


app.use('/',ConsultantRoutes)
app.use('/',HelpDeskRoutes)
app.use('/',ManagerRoutes)



app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

console.log("http://localhost:5000/");

app.listen(PORT, console.log(`Server port ${PORT}`));
