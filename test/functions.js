const  addToLocal = require("./fun")


const testFun = (req, res) => {
  res.render('Consultant/uploadReport',{
    patientName : "Name of the patient",
    email:"abcd@test.com",
    phoneNumber:9876543210,
    patientID:"pat1234567890"
  })
};

module.exports = testFun;

//  -     td
//             -       i.fa.fa-close
//             -     td.text-center
//             -       .img.rounded-circle.mb-2(style="background-color:green")
//             -       a(href="#")
//             -         strong Yoga training
//             -         br
//             -         | 7 am-6 am
