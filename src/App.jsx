import  Login  from "./pages/Login";
import  Signup  from "./pages/Signup";
import  AdminApproval  from "./pages/AdminApproval";
import {BrowserRouter as Router,Routes,Route, Navigate} from "react-router-dom";
import Products from "./pages/Products";
import Brands from "./pages/Brands";
import Categories from "./pages/Categories";
// import Experiment from "./pages/Experminent";

const App=()=>{
  const user=false;
  return (
    <Router>
      <Routes>
        <Route path="/login" element={user?<Navigate to="/"/>:<Login/>}/>
        <Route path="/signup" element={user?<Navigate to="/"/>:<Signup/>}/>
        <Route path="/admin" element={user?<Navigate to="/"/>:<AdminApproval/>}/>
        <Route path="/product" element={user?<Navigate to="/"/>:<Products/>}/>
        <Route path="/brand" element={user?<Navigate to="/"/>:<Brands/>}/>
        <Route path="/categories" element={user?<Navigate to="/"/>:<Categories/>}/>
        {/* <Route path="/experiments" element={user?<Navigate to="/"/>:<Experiment/>}/> */}
      </Routes>
    </Router>
  );
}
export default App;
