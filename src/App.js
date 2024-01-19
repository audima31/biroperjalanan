import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Authentication/Login";
import Register from "./component/Authentication/Register";
import TambahDataTuris from "./component/MenuTuris/TambahDataTuris";
import MenuTuris from "./component/MenuTuris/MenuTuris";
import DetailTuris from "./component/MenuTuris/DetailTuris";
import UpdateDataTuris from "./component/MenuTuris/UpdateDataTuris";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} exact />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MenuTuris />}></Route>
        <Route path="/createTourist" element={<TambahDataTuris />}></Route>
        <Route path="/detail/:id" element={<DetailTuris />}></Route>
        <Route path="/update/:id" element={<UpdateDataTuris />}></Route>

        {/* <Route path="/product/detail/:id" element={<DetailProduct />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/journey" element={<Journey />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/keranjang" element={<Keranjang />}></Route>
        <Route path="/mobileModal" element={<MobileModal />}></Route> */}
      </Routes>
    </Router>
  );
}

export default App;
