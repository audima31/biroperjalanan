import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Authentication/Login";
import Register from "./component/Authentication/Register";
import TambahDataTuris from "./component/MenuTuris/TambahDataTuris";
import MenuTuris from "./component/MenuTuris/MenuTuris";
import DetailTuris from "./component/MenuTuris/DetailTuris";
import UpdateDataTuris from "./component/MenuTuris/UpdateDataTuris";
import Profile from "./component/Authentication/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MenuTuris />} exact></Route>
        <Route path="/createTourist" element={<TambahDataTuris />}></Route>
        <Route path="/detail/:id" element={<DetailTuris />}></Route>
        <Route path="/update/:id" element={<UpdateDataTuris />}></Route>
        <Route path="/profileUser" element={<Profile />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
