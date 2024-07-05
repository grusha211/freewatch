import React, { useState } from 'react';
import { signup } from '../services/authService';
import './signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    mobile: '',
    email: ''
  });

  const { firstname, lastname, mobile, email } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const response = await signup(formData);
      alert(response.message);
    } catch (error) {
      console.error(error);
      alert('Error signing up');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={onSubmit}>
        <input type="text" name="firstname" value={firstname} onChange={onChange} placeholder="First Name" required />
        <input type="text" name="lastname" value={lastname} onChange={onChange} placeholder="Last Name" required />
        <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
        <input type="text" name="mobile" value={mobile} onChange={onChange} placeholder="Mobile Number" required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
