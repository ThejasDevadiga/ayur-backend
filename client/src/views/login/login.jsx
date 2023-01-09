import React, { useEffect, useState } from "react";
import './login.css'
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const [useremail, setUserEmail] = useState("");
  const [userpassword, setUserPassword] = useState("");
  const [userRole, setUserRole] = useState("");

  const submitHandler =()=>{
    console.log(useremail,userpassword);
    if(userRole === "doctor"){
      navigate("/Consultant");
    }
    else if(userRole==="admin"){
      navigate("/admin");
    }
    else if(userRole==="manager"){
      navigate("/Manager");
    }
    else if(userRole==="receptionist"){
      navigate("/receptionist");
    }
  }
    return (
      <>
     
      <div id="loginform">
        <Form onSubmit={submitHandler}>
        <FormHeader title="Login" />
        <FormInput description="UserRole" placeholder="Enter your designation" type="text" values={userRole} onChange={(e)=> setUserRole(e.target.value)} />
        <FormInput description="Username" placeholder="Enter your username" type="text" values={useremail} onChange={(e)=> setUserEmail(e.target.value)} />
     <FormInput description="Password" placeholder="Enter your password" type="password" values={userpassword}  onChange={(e)=> setUserPassword(e.target.value)}/>
           <FormButton  title="Log in"  />
     </Form>
      </div>
      </>
    );
  }


const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
);




const FormButton = props => (
  <div id="button" className="row">
    <button type="submit" >{props.title}</button>
  </div>
);

const FormInput = props => (
  <div className="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder}  value={props.values} onChange={props.onChange}/>
  </div>  
);

  
  export default Login;