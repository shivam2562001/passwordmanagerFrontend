import React from 'react'
import {Link} from 'react-router-dom';
function Home(){
 
  return (
    <>
      <div className="container-fluid">
        <br/>
        <br/>
        <br/>
        <div>
          <h1>PASSWORD MANAGEMENT SYSTEM</h1>
          <Link to="/login">
            <button className="btn btn-raised btn-success">Get Started</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;