import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setcurrState] = useState("Login");

  const [data, setData] = useState({ name: "", email: "", password: "" });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onLogin = async (event) => {
    event.preventDefault();

    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="LoginPopup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popoup-title">
          <h2>{currState}</h2>
          <img onClick={() => setLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {/* we have to hide the name stae when it is login page */}
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Enter Your Name"
              required
            />
          )}

          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="Email"
            placeholder="Enter Your Email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="Password"
            placeholder="Enter Your Password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing i agree to the terms of use &private policy</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a New Account?
            <span onClick={() => setcurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an Account?
            <span onClick={() => setcurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
