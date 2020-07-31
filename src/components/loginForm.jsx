import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import {login} from '../services/authService';
import { Redirect } from "react-router-dom";
import auth from "../services/authService";
class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async() => {   
     try {
       const { data } = this.state;
       await login(data.email, data.password);
       const { state } = this.props.location;
       console.log(state);
       window.location = state ? state.from.pathname : "/";
     } catch (ex) {
       if (ex.response && ex.response.status === 400) {
         const errors = { ...this.state.errors };
         errors.username = ex.response.data;
         this.setState({ errors });
       }
     }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <>
        <br />
        <div className="container-fluid p-5">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
      </>
    );
  }
}

export default LoginForm;
