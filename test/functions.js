  
const testFun = (req, res) => {
  res.render('Manager/registerEmployee',
  {
    data:"hello",
    data2:'jtyj'
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
