const testFun = (req, res) => {
  // const fmDate = new Date(req.params['id'])
  // const toDate = new Date(req.params['id'])
  // toDate.setDate(toDate.getDate() + 10)
  // let dates = []
  // const count=new Date(req.params['id'])
  // while(count.getTime() <= toDate.getTime()){
  //   dates.push(count.getDate());
  //   count.setDate(count.getDate()+1)
  // }
  // res.render("Components/scheduleTable", {
  //   title: "Schedules",
  //   heading: "Appointments from "+fmDate.getDate()+"-"+(fmDate.getMonth()+1)+"-"+fmDate.getFullYear()+ " to "+toDate.getDate()+"-"+(toDate.getMonth()+1)+"-"+toDate.getFullYear(),
  //   listOfDates:dates,
  //   date:fmDate,
  //   month:fmDate.getMonth()+1,
  //   year:fmDate.getFullYear(),
  //   frmDate:fmDate.getDate(),
  //   appointments: [
  //     {
  //       date:"21",
  //       time:8,
  //       name:"Name of user",
  //       imgUrl:"https://www.w3schools.com/howto/img_avatar.png",
  //       number:0987651234,
  //       description:"Description of user"
  //     },
      
  //     {
  //       date:"21",
  //       time:16,
  //       name:"Name of user",
  //       imgUrl:"https://www.w3schools.com/howto/img_avatar.png",
  //       number:0987651234,
  //       description:"Description of user"
  //     },
  //     {
  //       date:"30",
  //       time:8,
  //       name:"Name of user",
  //       imgUrl:"https://www.w3schools.com/howto/img_avatar.png",
  //       number:0987651234,
  //       description:"Description of user"
  //     },
  //     {
  //       date:"30",
  //       time:16,
  //       name:"Name of user",
  //       imgUrl:"https://www.w3schools.com/howto/img_avatar.png",
  //       number:0987651234,
  //       description:"Description of user"
  //     },
  //   ],
  // });

  res.render("Components/form",{
    
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
