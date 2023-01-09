import '../sidebar/sidebar.css'
import Button from 'react-bootstrap/Button';
import './consultant.css'
function Consultant(params) {
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
                <li>
                    <div className="profile-details">
                      <a href="">
                        <i className="fas fa-cog">Setting</i>
                          
                      </a>
                    </div>
                </li>
            </ul>
        </div>
        <section className="home-section">
<div className="consultant-home">
            <table className="patients-table">
                <thead>
                    <th>S.No</th>
                    <th>NAME</th>
                    <th>PID</th>
                    <th>Ph.No</th>
                    <th>Disease</th>
                    <th>Make Report</th>
                    <th>Details</th>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                        <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                        <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                        <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                        <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                       <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                        <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                        <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                        <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                        <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>patient-data</td>
                        <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                        <td>  <Button className='button' variant="primary">Primary</Button>{' '}</td>
                    </tr>
                                       
                </tbody>
            </table>  
            </div>
        </section>   
    </>
    ) 
}

export default  Consultant