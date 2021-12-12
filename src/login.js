import React from "react";
import { useState,useEffect } from "react";
import { Button, Form, Modal, Table, Dropdown, } from "react-bootstrap";
import './style.css';
import { Link } from "react-router-dom";

const Login=({history})=>{
    const[values,setvalues]=useState({
        email:'',
        password:'',
    })
    const[loginFlag,setLoginFlag]=useState(false)
    const[errors,setErrors]=useState({
    email:'',
    password:''
    })
const handleChange=(e)=>{
const{name,value}=e.target
    setvalues({
   ...values,
   [name]:value 
})
}
const staticValidate = () => {
  let errors = {}
  let formIsValid = true;

  if (!values.email.trim()) {
      formIsValid = false
      errors.email = 'Enter Email Id '
  } else {
     
          errors.email = ''
      
  }
  if (!values.password.trim()) {
    formIsValid = false
    errors.password = 'Enter Password '
} else {
   
        errors.password = ''
    
}

  
  setErrors(errors);
  return formIsValid;
}
const submitHandler=(e)=>{
  e.preventDefault()
  if(staticValidate()){
 let array= JSON.parse(localStorage.getItem('users'))
let element=array.find(obj => obj.email === values.email);
if(element!=null){
 if(element && element.password===values.password){
   
   localStorage.setItem('email',values.email)
   history.push({ 
    pathname: '/shop'
   });

 }
 else{
   alert('incorrect login')
 }
}
  }
//   else{
//     alert('Doesnot exist emailid')
//  }
  
}
const handleLink=()=>{
  history.push('./register')
}

return(
  <div>
  <div className="h1-container">
  <h1 align='center' >Login</h1>
  </div>
    <div className="form-container">

<form>
  <div class="row">
    <label for="email">Email</label>
    <input type="email" name="email" autocomplete="off" placeholder="email@example.com" onChange={handleChange}/>
    {errors.email && <p className="errortext">{errors.email}</p>}
  </div>
  <div class="row">
    <label for="password">Password</label>
    <input type="password" name="password" onChange={handleChange}/>
    {errors.password && <p className="errortext">{errors.password}</p>}
  </div>
  <button type="submit" onClick={submitHandler}>Login</button>

<button onClick={handleLink}>Register</button>
</form>

</div>
</div>
)
}
export default Login;