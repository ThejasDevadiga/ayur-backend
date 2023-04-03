window.addEventListener("load",async()=>{
 
    
  const canvas1 = document.getElementById('canvas1');
  canvas1.style.width=50%
  new Chart(canvas1, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [7, 4, 3, 5, 2, 3,7, 4, 3, 5, 2, 3,7, 4, 3, 5, 2, 3,7, 4, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }, 
      responsive: true,
      maintainAspectRatio: false,
    }
    
  })
  
  // -----------------------------------------
  
  
  const canvas2 = document.getElementById('canvas2');
    
  
 
  const loadData = async(body,url,method)=>{
    var result = await requestor(
      method,
      body,
     url
    );
    const res = JSON.parse(result);
    if(res.acknowledged){
      return res.data
    }
    else{
    return []
    }
  }
  
  var raw = JSON.stringify({ 
    requestedId:"Hello"
    });
    
  
  const patinetCounts =await  loadData(raw,"http://localhost:5000/api/visualise/patient-count","POST")
 

const data = {
    labels: ["0-10","10-20","20-30","30-40","40-50","50-60","60-70","70-80","80-inf"],
    datasets: [
        {
            label: 'Female',
            data: [0,0,0,0,0,0,0,0,0],
            borderWidth: 1
        },
        {
            label: 'Male',
            data: [0,0,0,0,0,0,0,0,0],
            borderWidth: 1
        }
    ]
};

patinetCounts.forEach(item => {
    const ageGap = item._id.ageGap;
    const gender = item._id.gender;
    const count = item.count;

    if (gender === 'female') {
        data.datasets[0].data[ageGap] = count;
    } else {
        data.datasets[1].data[ageGap] = count;
    }
});
  
  
  new Chart(canvas2, {
    type: 'bar',
    data:data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }, 
      responsive: true,
      maintainAspectRatio: false,
    }
    
  })
  
  // -------------------------------------------------
  
  const canvas3 = document.getElementById('canvas3');

  new Chart(canvas3, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [7, 4, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }, 
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
    }
    
  })
  
})