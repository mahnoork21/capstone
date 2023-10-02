//import files
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Header } from "@/shared/clinician/header/Header";

const LoginLanding = () => {
  return (
    <>
      <Header text="PUFI-2" />
      <div className="login-container">
        <form action="/" style={{ border: 1 + "px" + " #ccc" }}>
          <div class="container">
            <h2>Log in to your clinician account</h2>
            <br />
            <label for="email">Email or clinician id</label>
            <input type="text" placeholder="" name="email" required></input>
            <label for="psw">Password</label>
            <input
              type="password"
              placeholder=""
              name="password"
              required
            ></input>

            <button type="submit" class="pufi-primary-blue" id="loginbtn">
              LOG IN
            </button>

            <p>Don't have an account yet?</p>

            <button type="button" class="pufi-primary-blue" id="createbtn">
              CREATE NEW ONE
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginLanding;
