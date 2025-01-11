import React from 'react'
import axios from '../../config/axios';
import { useNavigate } from 'react-router-dom';

const InsurerRegister = () => {
      const [userName, setName] = React.useState('');
      const [email, setEmail] = React.useState('');
      const [password, setPassword] = React.useState('');
      const [confirmPassword, setConfirmPassword] = React.useState('');
      const navigate = useNavigate()

      const handleRegister = async(e) => {
            e.preventDefault();
            try{  
                  if(password!==confirmPassword){
                        alert("Password and Confirm Password do not match");
                        return;
                  }
                  const response = await axios.post('/insurers/register', {userName,email,password});
                  navigate('/insurers/login');
            }
            catch(err){
                  console.log(err);
            }
      }

  return (
      <div style={{backgroundColor:"#79D7BE"}} className="flex justify-center items-center min-h-screen">
    <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
      <h1 className="text-3xl font-bold text-center">Insurer Register</h1>
      <form 
      className='flex flex-col items-center'
      onSubmit={handleRegister}>
            <input 
            className="border border-gray-400 p-2 w-80 mt-4 rounded" 
            type='text' 
            placeholder='Name' 
            value={userName}
            onChange={(e) => setName(e.target.value)}
            />
            <input 
            className="border border-gray-400 p-2 w-80 mt-4 rounded" 
            type='email' 
            placeholder='Email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <input 
            className="border border-gray-400 p-2 w-80 mt-4 rounded" 
            type='password' 
            placeholder='Password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <input 
            className="border border-gray-400 p-2 w-80 mt-4 rounded" 
            type='password' 
            placeholder='Confirm Password' 
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}/>
            
            <button 
            className="bg-blue-500 text-white p-2 w-80 mt-4 rounded transition-transform transform hover:scale-105">
                  Register
            </button>
      </form>
      <div className="mt-4 flex flex-wrap justify-center">
            <p className="text-center">Already have an account?</p>
            <a 
            className='ml-2 text-stone-900 underline'
            href="/insurers/login">
                  Login
            </a>
      </div>
    </div>
    </div>
  )
}

export default InsurerRegister