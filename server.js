const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const cors = require("cors");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const auth = require('./src/middlewares/authMiddleware')
const WebServer = require('open')

const ConsultantRoutes = require("./src/routes/Consultant/ConsultantRoutes");
const HelpDeskRoutes = require("./src/routes/Receptionist/ReceptionistRoutes");
const ManagerRoutes = require("./src/routes/manager/ManagerRoutes");
const UserRoutes = require('./src/routes/user/userRoutes')
const loginView = require('./client/routes/login/loginRoutes')
const consultantView = require('./client/routes/consultant/consultantRoutes')


const { notFound, errorHandler } = require("./src/middlewares/errorMiddleware");

dotenv.config();

connectDB();

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());
app.set('views', 'views');
app.set('view engine', 'pug');

console.log(__dirname);
app.use(express.static('public'));  

// Backend routes 
app.use('/',ConsultantRoutes)
app.use('/',HelpDeskRoutes)
app.use('/',ManagerRoutes)
app.use('/',UserRoutes)

//Frontend routes
app.use('/',loginView)
app.use('/',consultantView)

// app.get('/hello', function (req, res) {
//     res.render('index', { title: 'Hello', message: 'Hello there!' })
//   });

app.use(notFound);

app.use(errorHandler);



const PORT = process.env.PORT || 5001;
// WebServer(`http://localhost:${PORT}/`)
console.log(`http://localhost:${PORT}/`);
app.listen(PORT, console.log(`Server port ${PORT}`));
