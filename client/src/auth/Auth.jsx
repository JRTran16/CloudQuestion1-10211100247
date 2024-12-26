import React, { useState } from 'react';
import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';


import Input from './input/Input';
import { login } from '../api/auth';


const Auth = ({ page, setUserAuthed }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(page, email, username, password);
    console.log("object", result)
    if (result === 'registered') {
      navigate('..');
    } else if (result === 'signed-in') {
      console.log("signing in")
      setUserAuthed(true)
      navigate('/portal/customer')
    }
    setLoading(false)
  };

  return (
    <form onSubmit={handleSubmit} className='Auth'>
      <h1>{page === 'login' ? 'Login' : 'Sign up'}</h1>
      {page === 'sign-up' && (
        <Input placeholder={'username'} type={'text'} value={username} setValue={setUsername} top={80} />
      )}
      <Input placeholder={'email'} type={'email'} value={email} setValue={setEmail} top={80 + 60 * (page === 'sign-up')} />
      <Input placeholder={'password'} type={'password'} value={password} setValue={setPassword} top={140 + 65 * (page === 'sign-up')} />
      <div>
        <input type="checkbox" />
        <label htmlFor="remember me"> Remember me</label>
      </div>
      {page === 'login' && <div className='forgot-password'><a href=''>Forgot password?</a></div>}
      <div className='submit-div'>
        {
          loading ? <Spinner radius={50} color="#345C70" stroke={2} visible={true} /> :
          <input type="submit" value={page === 'login' ? 'Sign in' : 'Create an account'} />
        }
      </div>
      <div className='or'>or</div>
      <div className='google'>{page === 'login' ? 'Sign in with google' : 'Create an account with google'}</div>
      <div className='sign-up'>
        {page === 'login' ? "Don't have an account" : 'Already have an account'}?
        <Link to={page === 'login' ? '/register' : '..'}>
          {page === 'login' ? 'Sign up' : 'Sign in'}
        </Link>
      </div>
    </form>
  );
};

export default Auth;
