import React from 'react';
import pass from '../services/passwordService';
import Joi from "joi-browser";
import Form from "./common/form";
import {toast} from 'react-toastify';
class PasswordForm extends Form {
  state = {
    data: { sitename: "", password: "" ,username: ""},
    errors: {},
  };

  schema = {
    sitename: Joi.string().required().label("Sitename"),
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
    
  };

  doSubmit = async () => {
    try {  
      const { data } = this.state;
      data.createdbyID=this.props.user._id;
     const response= await pass.savePassword(data);
     if(response)
      toast.success("YOUR PASSWORD SAVED SUCCESSFULLY", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
       else
          toast("Category already exist", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        
      this.props.history.push("/allpasswords");

    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.sitename = ex.response.data;
        this.setState({ errors });
        toast.danger("Something Wrong", {
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
      <br/>
      <div className="container-fluid p-5">
        <h1>Save Your Password</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("sitename", "Sitename")}
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Save Password")}
        </form>
      </div>
      </>
    );
  }
}

export default PasswordForm;

