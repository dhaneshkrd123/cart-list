import React from "react";
import { useState,useEffect } from "react";
import { Button, Form, Modal, Table, Dropdown, } from "react-bootstrap";
import './style3.css';
const Registerform=({history})=>{
    const[values,setvalues]=useState({
       name:'',
        email:'',
        password:'',
        confirmPassword:''
    })
    const[errors,setErrors]=useState({
      name:'',
      email:'',
      password:'',
      confirmpassword:'',
      passwordequal:''
    })
    const[loginFlag,setLoginFlag]=useState(false)
// useEffect(()=>{
//    localStorage.setItem('users',JSON.stringify([]))
// },[])
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
 
  if (values.name=='') {
    formIsValid = false
    errors.name = 'Enter Name '
} else {
   
        errors.name = ''
    
}
  if (values.email=='') {
      formIsValid = false
      errors.email = 'Enter Email Id '
  } else {
     
          errors.email = ''
      
  }
  if (values.password=='') {
    formIsValid = false
    errors.password = 'Enter Password '
} else {
   
        errors.password = ''
    
}
if (values.confirmPassword=='') {
  formIsValid = false
  errors.confirmpassword = 'Enter Confirm Password '
} else {
 
      errors.confirmpassword = ''
  
}
if(values.confirmPassword!='' && values.password!=''){
if (values.confirmPassword!=values.password) {
  formIsValid = false
  errors.passwordequal = 'Entered Passwords are not equal  '
} else {
 
      errors.passwordequal = ''
  
}
}
  setErrors(errors);
  return formIsValid;
}
const submitHandler=(e)=>{
  e.preventDefault()
  if(staticValidate()){  
    
  
    let users=JSON.parse(localStorage.getItem('users'))
   if(users && users.length>=0){
    users.push(values)
     alert("Succcessfully Registered")
     history.push({ 
      pathname: '/'
     });
  }
   else{
      users=[]
      users.push(values)
   }
localStorage.setItem('users',JSON.stringify(users))
  
  }
}


return(
    <div className="register-container">
<h1>Register</h1>
<form >
<div class="row">
    <label for="name">Name</label>
    <input type="text" name="name" autocomplete="off" placeholder="" onChange={handleChange}/>
    {errors.name && <p className="errortext">{errors.name}</p>}
  </div>
  <div class="row">
    <label for="email">Email</label>
    <input type="email" name="email" autocomplete="off" placeholder="email@example.com" onChange={handleChange}/>
    {errors.email &&<p className="errortext"> {errors.email}</p>}
  </div>
  <div class="row">
    <label for="password">Password</label>
    <input type="password" name="password" onChange={handleChange}/>
    {errors.password && <p className="errortext">{errors.password}</p>}
  </div>
  <div class="row">
    <label for="confirmpassword">Confirm Password</label>
    <input type="password" name="confirmPassword" autocomplete="off" placeholder="" onChange={handleChange}/>
    {errors.confirmpassword && <p className="errortext">{errors.confirmpassword}</p>}
    {errors.passwordequal && <p className='errortext'>{errors.passwordequal}</p>}
  </div>
  <button onClick={submitHandler}>Register</button>

</form>

</div>
)
}
export default Registerform;