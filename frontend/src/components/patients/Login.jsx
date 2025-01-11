// filepath: /c:/Users/devye/Desktop/Projects/claims management project/frontend/src/components/patients/Login.jsx
import React, { useState,useContext } from 'react';
import axios from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState('');
  const navigate = useNavigate();
  const { patientLogin } = useContext(AuthContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/patients/login', { email, password });
      patientLogin(response.data.token);
      navigate('/patients/dashboard');
    } catch (err) {
      console.log(err);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div style={{backgroundColor:"#79D7BE"}} className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-110 hover:shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-4">Patient Login</h1>
        <form className="flex flex-col items-center" onSubmit={handleLogin}>
          <input
            className="border border-gray-400 p-2 w-80 mt-4 rounded"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <input
            className="border border-gray-400 p-2 w-80 mt-4 rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="password"
          />
          <button className="bg-blue-500 text-white p-2 w-80 mt-4 rounded transition-transform transform hover:scale-105">
            Login
          </button>
        </form>
        <div className="mt-4 flex flex-wrap justify-center">
          <p className="text-center">Create an Account?</p>
          <a className='ml-2 text-stone-900 underline' href='patients/register'>Register here</a>
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      </div>
    </div>
  );
};

export default Login;