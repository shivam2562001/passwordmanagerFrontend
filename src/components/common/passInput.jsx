import React from 'react';
import { useState } from 'react';

export default function PassInput({value}) {
  const [attr,setAttr] = useState('password');
  const [btn,setbtn] = useState('show')

  function toggle() {
    if (attr==='password') {
      setAttr('text');
      setbtn('hide')
     }
    else {
      setAttr('password');
      setbtn('show')
    }
  }
  return (
    <>
      <input type={attr} className="input"  id="password" value={value} readOnly/>
        &nbsp;  <button className="btn btn-info" onClick={toggle}>{btn}</button>
    </>
  )
}
