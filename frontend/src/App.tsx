import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

//components
import AdminRoot from "./Components/Adminroot.component";

//screens
import Login from "./Screens/Login";
// import BacgroundVerification from "./Screens/BackgroundVerification";
import Adminlogin from "./Screens/AdminLogin";
import Usermanagement from "./Screens/Usermanagement";
import Templates from "./Screens/Templates";
import Fields from "./Screens/Fields";
import Order from "./Screens/Order";
import Home from "./Screens/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<Adminlogin />} />
          <Route path="/admin" element={<AdminRoot />}>
            <Route index path="applicants" element={<Usermanagement />} />
            <Route path="template" element={<Templates />} />
            <Route path="fields" element={<Fields />} />
            <Route path="order" element={<Order />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
