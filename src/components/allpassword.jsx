import React from 'react';
import pass from '../services/passwordService';
import PassInput from './common/passInput';
import { useState,useEffect } from 'react';
import { useCallback } from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import shortid from 'shortid';

export default function AllPassword({user}) {
  const [allPassword,setPasswords]=useState([]);
 let [count]=useState(0);
 
  const handlePassword = useCallback(async () => {
    const { data: allPassword } = await pass.getPassword();

    setPasswords(allPassword);
  },[])


  useEffect(() => {
    
    handlePassword();
  }, [handlePassword])

  const handleDelete = async (passId) => {
    const originalPasswords = allPassword;
    const passwords = originalPasswords.filter(p => p._id !== passId);
    setPasswords(passwords);
    toast.success("Password deleted successfully");
    try {
      await pass.deletePassword(passId);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This password has already been deleted.");

      setPasswords(originalPasswords);
    }
  };



  return (
    <div className="container-fluid">
      <br/>
      <br />
      <br />
    <Link to="/savepassword"><button className="btn btn-primary">New Password</button></Link>
    <br/>
    <br/>
   <table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">S.No.</th>
      <th scope="col">Sitename</th>
      <th scope="col">Username</th>
      <th scope="col">Password</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    {
      allPassword ?allPassword.map(pass =>(
          pass.createdbyID === user._id ? (<>
          <tr key={shortid.generate()}>
            <th key={shortid.generate()} scope="row">{++count}</th>
            <td key={shortid.generate()} >{pass.sitename}</td>
            <td key={shortid.generate()} >{pass.username}</td>
            <td key={shortid.generate()}><PassInput value={pass.password}/></td>
            <td key={shortid.generate()}>
              <Link key={shortid.generate()} className="btn btn-success" to={`/editpassword/${pass._id}`}> Edit</Link>
              &nbsp;&nbsp;
              <button key={shortid.generate()} className="btn btn-danger" onClick={()=>handleDelete(pass._id)}>Delete</button>
              </td>
            </tr>
          </>) :
            null
        )
      )
      : null
    }
  </tbody>
</table>
    </div>
  )
}
      