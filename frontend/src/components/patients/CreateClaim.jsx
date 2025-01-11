import React, { useState, useContext } from 'react';
import axios from '../../config/axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateClaim = () => {
  const navigate = useNavigate();
  const { patientAuth, patientLogout } = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [claimDescription, setClaimDescription] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [claimFile, setFile] = useState(null);
  const [notification, setNotification] = useState('');

  const handleLogout = async () => {
    try {
      await axios.post('/patients/logout', {}, {
        headers: {
          Authorization: `Bearer ${patientAuth}`
        }
      });
      patientLogout();
      navigate('/patients/login');
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('email', email);
    formData.append('claimDescription', claimDescription);
    formData.append('claimAmount', claimAmount);
    formData.append('claimFile', claimFile);

    try {
      await axios.post('/patients/claim', formData, {
        headers: {
          Authorization: `Bearer ${patientAuth}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setNotification('Claim created successfully!');
      setTimeout(() => {
        navigate('/patients/dashboard');
      }, 2000); 
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ backgroundColor: "#79D7BE" }} className='w-full min-h-screen'>
      <nav className='ml-10 justify-center'>
        <button
          style={{ backgroundColor: "#F6F4F0" }}
          className='mr-4 p-2 rounded-lg transition-transform transform hover:scale-105'
          onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <form className='flex flex-col items-center mt-10 gap-2' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border border-gray-400 p-2 w-80 mt-4 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-400 p-2 w-80 mt-4 rounded"
        />
        <textarea
          placeholder="Claim Description"
          value={claimDescription}
          onChange={(e) => setClaimDescription(e.target.value)}
          className="border border-gray-400 p-2 w-80 mt-4 rounded"
        />
        <input
          type="number"
          placeholder="Claim Amount"
          value={claimAmount}
          onChange={(e) => setClaimAmount(e.target.value)}
          className="border border-gray-400 p-2 w-80 mt-4 rounded"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="border border-gray-400 p-2 w-80 mt-4 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-80 mt-4 rounded transition-transform transform hover:scale-105">
          Submit Claim
        </button>
      </form>
      {notification && (
        <div className="mt-4 p-2 bg-green-500 text-white rounded">
          {notification}
        </div>
      )}
    </div>
  );
};

export default CreateClaim;