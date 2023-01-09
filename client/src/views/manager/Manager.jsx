import '../sidebar/sidebar.css'

function Manager(params) {
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
                          <span className="link_name">Settings</span>
                      </a>
                    </div>
                </li>
            </ul>
        </div>
        <section className="home-section">

        </section>
        
        </>
    ) 
}

export default  Manager