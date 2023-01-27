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
const receptionistView = require('./client/routes/receptionist/receptionistRoutes')
const adminView = require('./client/routes/admin/adminRoutes')
const managerView = require('./client/routes/manager/managerRoutes')
const wardenView = require('./client/routes/warden/wardenRoutes')


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
app.use('/',receptionistView)
app.use('/',adminView)
app.use('/',managerView)
app.use('/',wardenView)

app.get('/template/test.pug',(req,res)=>{
    res.render("Components/scheduleTable", {
        title: "",
        heading:"Appointments",
        appointments:[
            [
                {
                    status:1,
                    name:"abcd",
                    image:"jpg",
                    number:1234567890
                },
                {
                    status:1,
                    name:"abcd",
                    image:"jpg",
                    number:1234567890
                },
                {
                    status:1,
                    name:"abcd",
                    image:"jpg",
                    number:1234567890
                },
                {
                    status:0,
                    name:"abcd",

                },
                {
                    status:1,
                    name:"abcd",
                    image:"jpg",
                    number:1234567890
                },
                {
                    status:0,
                    name:"abcd",

                },
                {
                    status:0,
                    name:"abcd",

                },
            ],
            [
                {
                    status:0,
                    name:"abcd",

                },
                {
                    status:1,
                    name:"abcd",
                    image:"jpg",
                    number:1234567890
                },
                {
                    status:0,
                    name:"abcd",

                },
                {
                    status:1,
                    name:"abcd",
                    image:"jpg",
                    number:1234567890
                },
                {
                    status:1,
                    name:"abcd",
                    image:"jpg",
                    number:1234567890
                },
                {
                    status:0,
                    name:"abcd",

                },
                {
                    status:1,
                    name:"abcd",
                    image:"jpg",
                    number:1234567890
                },
            ],
            [
                {
                    status:1,
                    name:"abcd",
                    image:"jpg",
                    number:1234567890
                },
                {
                    status:1,
                    name:"abcd",
                    image:"jpg",
                    number:1234567890
                },
                {
                    status:0,
                    name:"abcd",

                },
                {
                    status:1,
                    name:"abcd",
                    image:"jpg",
                    number:1234567890
                },
                {
                    status:1,
                    name:"abcd",
                    image:"jpg",
                    number:1234567890
                },
                {
                    status:1,
                    name:"abcd",
                    image:"jpg",
                    number:1234567890
                },
                {
                    status:1,
                    name:"abcd",
                    image:"jpg",
                    number:1234567890
                },
            ],
            [
                {
                    status:0,
                    
                },
                {
                    status:1,
                    name:"abcd",
                    image:"jpg",
                    number:1234567890
                },
                {
                    status:0,
                    
                },
                {
                    status:1,
                    name:"abcd",
                    image:"jpg",
                    number:1234567890
                },
                {
                    status:1,
                    name:"abcd",
                    image:"jpg",
                    number:1234567890
                },
                {
                    status:0,
                    
                },
                {
                    status:1,
                    name:"abcd",
                    image:"jpg",
                    number:1234567890
                },
            ],
            [
                {
                    status:1,
                    name:"abcd",
                    image:"jpg",
                    number:1234567890
                },
                {
                    status:0,
                    name:"abcd",

                },
                {
                    status:1,
                    name:"abcd",
                    image:"jpg",
                    number:1234567890
                },
                {
                    status:1,
                    name:"abcd",
                    image:"jpg",
                    number:1234567890
                },
                {
                    status:1,
                    name:"abcd",
                    image:"jpg",
                    number:1234567890
                },
                {
                    status:0,
                    name:"abcd",

                },
                {
                    status:1,
                    name:"abcd",
                    image:"jpg",
                    number:1234567890
                },
            ],
            [
                {
                    status:1,
                    name:"abcd",
                    image:"jpg",
                    number:1234567890
                },
                {
                    status:1,
                    name:"abcd",
                    image:"jpg",
                    number:1234567890
                },
                {
                    status:1,
                    name:"abcd",
                    image:"jpg",
                    number:1234567890
                },
                {
                    status:0,
                    name:"abcd",

                },
                {
                    status:1,
                    name:"abcd",
                    image:"jpg",
                    number:1234567890
                },
                {
                    status:0,
                    name:"abcd",

                },
                {
                    status:0,
                    name:"abcd",

                },
            ],
            
            
            
        ],
        appointment: {
            1: {
                status: 1,
                date:"10",
                day:7,
                time:0,
                name: "abcd",
                phone:1234567890,
                disease:"cough",
            },
            2: {
                status: 1,
                date:"10",
                day:1,
                time:1,
                name: "abcd",
                phone:1234567890,
                disease:"cough",
            },
            3: {
                status: 1,
                date:"10",
                day:2,
                time:2,
                name: "abcd",
                phone:1234567890,
                disease:"cough",
            },
            4: {
                status: 1,
                date:"10",
                day:3,
                time:3,
                name: "abcd",
                phone:1234567890,
                disease:"cough",
            },
            5: {
                status: 1,
                date:"10",
                day:5,
                time:4,
                name: "abcd",
                phone:1234567890,
                disease:"cough",
            },
            6: {
                status: 1,
                date:"10",
                day:7,
                time:6,
                name: "abcd",
                phone:1234567890,
                disease:"cough",
            },
            7: {
                status: 1,
                date:"10",
                day:6,
                time:7,
                name: "abcd",
                phone:1234567890,
                disease:"cough",
            },
            8: {
                status: 1,
                date:"10",
                day:7,
                time:9,
                name: "abcd",
                phone:1234567890,
                disease:"cough",
            },
            8: {
                status: 1,
                date:"10",
                day:7,
                time:10,
                name: "abcd",
                phone:1234567890,
                disease:"cough",
            },
            9: {
                status: 1,
                date:"10",
                day:1,
                time:5,
                name: "abcd",
                phone:1234567890,
                disease:"cough",
            },
            10: {
                status: 1,
                date:"10",
                day:7,
                time:3,
                name: "abcd",
                phone:1234567890,
                disease:"cough",
            },
            11: {
                status: 1,
                date:"10",
                day:2,
                time:8,
                name: "abcd",
                phone:1234567890,
                disease:"cough",
            },
            12: {
                status: 1,
                date:"10",
                day:7,
                time:2,
                name: "abcd",
                phone:1234567890,
                disease:"cough",
            },
            13: {
                status: 1,
                date:"10",
                day:4,
                time:8,
                name: "abcd",
                phone:1234567890,
                disease:"cough",
            },
          }
    })
})

app.use(notFound);

app.use(errorHandler);


// write a code for render a file


const PORT = process.env.PORT || 5001;
// WebServer(`http://localhost:5000/template/test.pug`)
console.log(`http://localhost:${PORT}/`);
app.listen(PORT, console.log(`Server port ${PORT}`));
