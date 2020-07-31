import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import {login} from '../services/authService';
import { toast } from "react-toastify";
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
         toast.success("login success wait...", {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
         });
     this.props.history.push("/home");
     } catch (ex) {
       if (ex.response && ex.response.status === 400) {
         const errors = { ...this.state.errors };
         errors.username = ex.response.data;
         this.setState({ errors });
           toast.danger("Login failure", {
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
