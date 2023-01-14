import React, { useState, useEffect } from "react";
import '../sidebar/sidebar.css'
import './receptionist.css'
import Button from 'react-bootstrap/Button';
import makeRequest from '../requestHandler/makeRequest'
function Receptionist(params) {
    const [patientData, setPatientData]=useState([]);
    const [consultants, setConsultants]=useState([]);
    const getConsutlants = async()=>{
        try {
            const url =  "http://localhost:5000/api/Receptionist/available-doctor";
            const id = "Hello";
            const payload = {
                "requestedId":id,
                "filter":{  
                },
                "projection":
                {
                    "_id":0
                }
            }
      
            const response = await makeRequest("post",url, payload);
            if (response == null) {
              console.log("Can't fetch the data");
            }
            setConsultants( response.data);
          } catch (e) { 
            console.log("Can't fetch the data : ", e);
          }
        };
    const getPatientData = async()=>{
        try {
            const url =  "http://localhost:5000/api/manager/get-patient-details";
            const id = "Hello";
            const payload = {
                "requestedId":id,
                "filter":{},
                "projection":{
                    "_id":0
                }
            };
      
            const patResponse = await makeRequest("post",url, payload);
            // console.log("Fetched data :", patResponse);
            if (patResponse == null) {
              console.log("Can't fetch the data");
            }
            setPatientData( patResponse.data);
          } catch (e) { 
            console.log("Can't fetch the data : ", e);
          }
        };
        
        

        useEffect(() => {
            getPatientData();
            getConsutlants();
          }, []);
          
    return (
        <>
        {console.log("pppppppppp",patientData)}
        
        <div className="sidebar close"> 
            <div className="logo-details">
            {console.log("qqqqqqqqqq",consultants)}
                <i className="fab fa-atlassian fa-bars"></i>
             </div>
        
            <ul className="nav-links">
                <li>
                    <div className="iocn-link">
                        <a href="#">
                            <i className="fas fa-user-injured">Patient</i>
                            <span className="link_name">Patient</span>
                        </a>
                        <i className="fas fa-angle-down arrow"></i>
                    </div>
                    <ul className="sub-menu">
                        <li><a className="link_name" href="#">Patient</a></li>
                        <li><a href="">Pateint Add</a></li>
                        <li><a href="">Patient Details</a></li>
                        <li><a href="">Patient Report</a></li>
                    </ul>
                </li>
 
               
            </ul>
        </div>

        <section className="home-section">
        <div className="sub-section">


        <div className="lft-sec">
            <table className="patient-table">
              <tr>
                    <th>S.No</th>
                    <th>NAME</th>
                    <th>PID</th>
                    <th>Ph.No</th>
                    <th>Details</th>
                    <th>Action</th>

                </tr>
                    {
                    patientData.map((patient) => (
                            
                                <tr>
                                    <td>{0}</td>
                                    <td>{patient.Basic.Fname} {patient.Basic.Mname}</td>
                                    <td>{patient.PatientID}</td>
                                    <td>{patient.Basic.phone}</td>
                                    <td>  <Button className='button' variant="primary">Details</Button>{' '}</td>
                                    <td>  <Button className='button' variant="primary">Update</Button>{' '}
                                    <Button className='button' variant="primary">Delete</Button>{' '}</td>
                                    </tr>
                  ))}
                    
                
            </table>
        </div>

        <div className="people-count">
            <div className="people-counts men-count"><h1>Men</h1><h2>4500</h2></div>
            <div className="people-counts women-count"><h1>Women</h1><h2>3000</h2></div>
            <div className="people-counts child-count"><h1>Children</h1><h2>1850</h2></div>
        </div>



        <div className="doctor-status">
            <table className="patient-table">
           

                <tr>
                    <th>S.No</th>
                    <th>NAME</th>
                    <th>EMP ID</th>
                    <th>Department</th>
                    <th>Status</th>
                </tr>
    

                {
                    consultants.map((consultant) => (
                    <tr>
                        <td>0</td>
                        <td>doctor</td>
                        <td>{consultant.EmployeeID}</td>
                        <td>{consultant.Department}</td>
                        <td>{consultant.Status}</td>
                    </tr>
                   ))}
            </table>
        </div>
    </div>
        </section>
        </>
    ) 
}

export default  Receptionist