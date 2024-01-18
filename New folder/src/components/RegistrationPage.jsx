// src/pages/RegistrationPage.js

import React, { useState } from "react";
import "./registration.css";
import { Link, useNavigate } from "react-router-dom";
import regImg from './assets/regisImg3.jpg'

function RegistrationPage() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (credentials.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/newuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();

      console.log(json);

      if (!json.success) {
        alert("Enter valid details");
      }

      if (json.success) {
        navigate("/LoginPage");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to fetch. Please check your network or try again later.");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="wrapper">
      <div className="container-reg">
      <div className="left-side">
          <img src={regImg} alt="Registration" />
        </div>
        <div className="right-side">
          <h2>Registration Form</h2>

          <form onSubmit={handleSubmit}>
            <div className="sub_container">
              <label htmlFor="name">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                name="name"
                className="form_control"
                value={credentials.name}
                onChange={onChange}
              />
            </div>

            <div className="sub_container">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                className="form_control"
                value={credentials.email}
                onChange={onChange}
              />
            </div>

            <div className="sub_container">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                autoComplete="off"
                name="password"
                className="form_control"
                value={credentials.password}
                onChange={onChange}
              />
            </div>
            <br />

            <button type="submit" className="btn btn-success">
              Register
            </button>
            <p>
              Already Have an Account..
              <Link to="/LoginPage">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
