import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import classes from './AuthForm.module.scss'

function Register() {
  const register = async (e) => {
    e.preventDefault();
    const user = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value
    };
    try {
      await axios.post('/api/auth/register', user);
      toast.success('Registration successful')
    } catch (error) {
       console.log(error);
       toast.error('Registration failed, please try again');
    }

  }

  return (
    <div className={classes.register}>
      <h1 className={classes.title}>Register</h1>
      <form className={classes.authForm} onSubmit={register}>
        <label htmlFor="name">
          Name
          <input type="text" name='name' placeholder='Full name' required />
        </label>
        <label htmlFor="email">
          Email
          <input type="email" name='email' placeholder='Email' required />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" name='password' placeholder='Password' required />
        </label>
        <br />
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register