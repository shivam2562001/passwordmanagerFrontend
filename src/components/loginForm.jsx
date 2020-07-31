import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import {login} from '../services/authService';
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
     this.props.history.push("/allpasswords");
     } catch (ex) {
       if (ex.response && ex.response.status === 400) {
         const errors = { ...this.state.errors };
         errors.username = ex.response.data;
         this.setState({ errors });
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
