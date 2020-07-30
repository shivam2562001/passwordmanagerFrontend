import React, { Component } from 'react';
import pass from '../services/passwordService';
import { toast } from 'react-toastify';

class EditPassword extends Component {
  constructor(props){
    super(props);
    this.state = {
      sitename: '',
      username: '',
      password : ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  componentDidMount(){
    this.getpasswordDetails();
  }

 async getpasswordDetails() {
    let Id = this.props.match.params.id;
  const {data} = await pass.getPasswordDetails(Id);
     this.setState({
       sitename: data.sitename,
       username: data.username,
       password: data.password
     })
  }


  async editpassword(data){
    try{
    let Id = this.props.match.params.id;
    await pass.editPassword(Id,data)
    this.props.history.push('/allpasswords');
    } catch(err){
      toast.error("Something Wrong")
    }

  }

  onSubmit(e){
    const data = {
      sitename: this.refs.sitename.value,
      username: this.refs.username.value,
      password: this.refs.password.value,
    }
    this.editpassword(data);
    e.preventDefault();
  }

  handleInputChange(e){
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
 


 

  render() {
    return (
      <>
        <br />
      <div className="container-fluid p-5">
        <h1>Edit Your Password</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="sitename">Sitename</label>
            <input type="text" name="sitename" ref="sitename" value={this.state.sitename} onChange={this.handleInputChange} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" ref="username" value={this.state.username} onChange={this.handleInputChange} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" ref="password" value={this.state.password} onChange={this.handleInputChange} className="form-control"/>
          </div>

          <input type="submit" value="Save" className="btn btn-primary" />
        </form>
      </div>
      </>
    );
  }
}

export default EditPassword;

