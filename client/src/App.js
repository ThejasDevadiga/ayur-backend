import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from '../src/views/login/login'
import Manager from "../src/views/manager/Manager"
import Receptionist from '../src/views/receptionist/Receptionist'
import Admin from './views/admin/Admin'
import Consultant from '../src/views/consultant/Consultnat'
import Navbar from "../src/views/navbar/navbar";

function App() {
  return (
    <>
     <Navbar></Navbar>
    <Router>
      <Routes>
      <Route exact path="/" element={<Login />}></Route>
      <Route exact path="/Manager" element={<Manager/>}></Route>
      <Route exact path="/Receptionist" element={<Receptionist/>}></Route>
      <Route exact path="/Admin" element={<Admin/>}></Route>
      <Route exact path="/Consultant" element={<Consultant/>}></Route>
</Routes>
    </Router>

    </>
  );
}

export default App;
