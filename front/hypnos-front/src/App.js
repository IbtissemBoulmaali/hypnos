import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./composants/Admin";
import Gerant from "./composants/Gerant";
import Login from "./composants/login";
import { ToastContainer } from "react-toastify";
import { Fragment } from "react";
import SignUp from "./composants/SignUp";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="admin" element={<Admin />} />
          <Route path="gerant" element={<Gerant />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
}

export default App;
