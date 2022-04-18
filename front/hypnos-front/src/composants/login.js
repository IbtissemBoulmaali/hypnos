import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import config from "../config.json";
import { toast } from "react-toastify";

const Login = (props) => {
  const [state, setState] = useState();
  let navigate = useNavigate();
  const [isConnected, setIsconnected] = useState(false);
  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      const userDecoded = jwtDecode(jwt);
      if (userDecoded) {
        if (userDecoded.exp > Date.now() / 1000) {
          console.log(userDecoded);
          setIsconnected(true);
        }
      }
    }
  }, []);

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function onConnect(e) {
    axios
      .get(
        `${config.urlServer.url}:${config.urlServer.port}/connexion/login?email=${state.email}&password=${state.password}`
      )
      .then((data) => {
        console.log(data);
        toast.success(data.data.msg);
        localStorage.setItem("token", data.data.data.token);
        localStorage.setItem("role", data.data.data.role);
        setIsconnected(true);
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  }

  if (isConnected) navigate("/admin");

  return (
    <div className="ctn__login">
      <div className="card-body cardbody-color">
        <div className="text-center">
          <img
            src={logo}
            className="img-fluid profile-image-pic img-thumbnail my-3"
            width="200px"
            alt="hypnos"
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="User Email"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="text-center">
          <button
            onClick={() => onConnect()}
            className="btn btn-color px-5 mb-5 w-100"
          >
            Login
          </button>
        </div>
        <div id="emailHelp" className="form-text text-center mb-5 text-dark">
          Not Registered?{" "}
          <a href="/signup" className="text-dark fw-bold">
            {" "}
            Create an Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
