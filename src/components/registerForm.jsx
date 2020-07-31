import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from '../services/userservice';
import auth from "../services/authService";
class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
   name: Joi.string()
      .required()
      .label("Username")
  };

  doSubmit = async() => {
    try {
      const response = await userService.Register(this.state.data);
      if (response)
        toast.success("user registered successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      else
        toast("something went wrong", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
     auth.loginWithJwt(response.headers["x-auth-token"]);
       window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
         toast("something went wrong", {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
         });
      }
    }
  };

  render() {
    return (
     <>
        <br />
        <div className="container-fluid p-5">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Username")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
      </>
    );
  }
}

export default RegisterForm;
