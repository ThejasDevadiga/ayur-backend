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
const wardenRoutes = require('./src/routes/Warden/warden')

const loginView = require('./client/routes/login/loginRoutes')
const consultantView = require('./client/routes/consultant/consultantRoutes')
const receptionistView = require('./client/routes/receptionist/receptionistRoutes')
const adminView = require('./client/routes/admin/adminRoutes')
const managerView = require('./client/routes/manager/managerRoutes')
const wardenView = require('./client/routes/warden/wardenRoutes')

const visualRoutes = require('./src/routes/Visualise/visualroutes')

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
app.use('/',wardenRoutes)

//Frontend routes
app.use('/',loginView)
app.use('/',consultantView)
app.use('/',receptionistView)
app.use('/',adminView)
app.use('/',managerView)
app.use('/',wardenView)

app.use('/',visualRoutes)
// app.post("/api/consultant/todays-doctor-appointments",(req,res)=>{
//     res.send({
//         aknowledge:true,
//         data:[],
//         message:"empty"
//     })
// })

const testFun = require('./test/functions')

app.get('/test',testFun)

app.use(notFound);

app.use(errorHandler);

// write a code for render a file

const PORT =  5000;

// WebServer(`http://localhost:5000/test`)
console.log(`http://localhost:${PORT}/test`);

app.listen(PORT, console.log(`Server port ${PORT}`));