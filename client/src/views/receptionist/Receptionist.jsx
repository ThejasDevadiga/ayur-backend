import '../sidebar/sidebar.css'
import './receptionist.css'
import Button from 'react-bootstrap/Button';

function Receptionist(params) {
    return (
        <>
        <div className="sidebar close">
            
            <div className="logo-details">
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
        <div class="sub-section">


        <div class="lft-sec">
            <table class="patient-table">
                <thead>
                    <th>S.No</th>
                    <th>NAME</th>
                    <th>PID</th>
                    <th>Ph.No</th>
                    <th>Details</th>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                    </tr>
                  
                    <tr>
                        <td>8</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                    </tr>
                    

                   
                </tbody>
            </table>
        </div>

        <div class="people-count">
            <div class="people-counts men-count"><h1>Men</h1><h2>4500</h2></div>
            <div class="people-counts women-count"><h1>Women</h1><h2>3000</h2></div>
            <div class="people-counts child-count"><h1>Children</h1><h2>1850</h2></div>
        </div>


        <div class="doctor-status">
            <table class="patient-table">
                <thead>
                    <th>S.No</th>
                    <th>NAME</th>
                    <th>EMP ID</th>
                    <th>Ph.No</th>
                    <th>Status</th>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>doctor</td>
                        <td>doctor</td>
                        <td>doctor</td>
                        <td><div class="status"></div></td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>doctor</td>
                        <td>doctor</td>
                        <td>doctor</td>
                        <td><div class="status"></div></td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>doctor</td>
                        <td>doctor</td>
                        <td>doctor</td>
                        <td><div class="status"></div></td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>doctor</td>
                        <td>doctor</td>
                        <td>doctor</td>
                        <td><div class="status"></div></td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>doctor</td>
                        <td>doctor</td>
                        <td>doctor</td>
                        <td><div class="status"></div></td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>doctor</td>
                        <td>doctor</td>
                        <td>doctor</td>
                        <td><div class="status"></div></td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>doctor</td>
                        <td>doctor</td>
                        <td>doctor</td>
                        <td><div class="status"></div></td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>doctor</td>
                        <td>doctor</td>
                        <td>doctor</td>
                        <td><div class="status"></div></td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>doctor</td>
                        <td>doctor</td>
                        <td>doctor</td>
                        <td><div class="status"></div></td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>doctor</td>
                        <td>doctor</td>
                        <td>doctor</td>
                        <td><div class="status"></div></td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>doctor</td>
                        <td>doctor</td>
                        <td>doctor</td>
                        <td><div class="status"></div></td>
                    </tr>
                    

                   
                </tbody>
            </table>
        </div>
       
    </div>
        </section>
        
        </>
    ) 
}

export default  Receptionist