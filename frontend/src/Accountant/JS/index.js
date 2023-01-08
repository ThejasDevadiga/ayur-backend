var trxArray = [50,60,70,80,90,100,110,120,130,140,150];
var tryArray = [7,8,8,9,9,9,10,11,14,14,15];

// Define Data
var trdata = [{
  x: trxArray,
  y: tryArray,
  mode: "lines",
  type: "scatter"
}];

// Define Layout
var trlayout = {
    xaxis: {range: [40, 160], title: "Date"},
    yaxis: {range: [5, 16], title: "Amount"},
    title: "Transactions Details"
  };
  
 
  Plotly.newPlot("transactions-graph", trdata, trlayout);
 
  var ptxArray = [55, 49, 44, 24, 15];
  var ptyArray = ["WOMEN","MEN","CHILDREN"];
  
  var ptdata = [{
    x: ptxArray,
    y: ptyArray,
    type: "bar",
    orientation: "h"
  }];
  
  var ptlayout = {title:"Patient Count"};
  
  Plotly.newPlot("patientCount-graph", ptdata, ptlayout);