import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from '../../config/axios';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import ClaimCard from './ClaimCard.jsx';

const PatientDashboard = () => {
      const [showClaims, setShowClaims] = useState(false);
      const [claims,setClaims] = useState([]);
      const navigate = useNavigate();
      const {patientAuth,patientLogout} = useContext(AuthContext);

      const handleLogout = async() => {
            try {
                  await axios.post('/patients/logout',{},{
                        headers:{
                              Authorization: `Bearer ${patientAuth}`
                        }
                  });
                  patientLogout();
                  navigate('/patients/login');
            } catch (err) {
                  console.log(err);
            }
      }
      const handlegetClaims = async() => {
            try {
                  const response = await axios.get('/patients/claimStatus',{
                        headers:{
                              Authorization: `Bearer ${patientAuth}`
                        }
                  });
                  setClaims(response.data.claim);
                  setShowClaims(true);
            } catch (err) {
                  console.log(err);
            }
      }
      return (
            <div style={{ backgroundColor: "#79D7BE" }} className='w-full min-h-screen' >
                  <br></br>
                  <h1 className='text-4xl text-center font-bold text-gray-800'>Patient Dashboard</h1>
                  <br></br>
                  <nav className='ml-10 justify-center'>
                  <button 
                  style={{backgroundColor:"#F6F4F0"}} 
                  className='mr-4 p-2 rounded-lg transition-transform transform hover:scale-105'
                  onClick={handlegetClaims}>
                        View Claims
                  </button>
                  <button
                  style={{backgroundColor:"#F6F4F0"}} 
                  className='mr-4 p-2 rounded-lg transition-transform transform hover:scale-105'
                  onClick={() => {navigate('/patients/createClaim')}}>
                        Create Claim 
                  </button>
                  <button 
                  style={{backgroundColor:"#F6F4F0"}} 
                  className='mr-4 p-2 rounded-lg transition-transform transform hover:scale-105'
                  onClick={handleLogout}>
                        Logout
                  </button>
                  <button 
                  style={{backgroundColor:"#F6F4F0"}} 
                  className='mr-4 p-2 rounded-lg transition-transform transform hover:scale-105'
                  onClick={() => {navigate('/insurers/login')}}>
                        Login as Insurer
                  </button>
                  </nav>
                  {showClaims && (
        <div >
          <h2 className="text-2xl font-bold mb-4 mt-8 ml-4">Your Claims</h2>
          <div className='flex flex-wrap gap-2 justify-center'>
            {Array.isArray(claims) && claims.map((claim) => (
                <ClaimCard
                  key={claim._id}
                  userName={claim.userName}
                  email={claim.email}
                  claimDescription={claim.claimDescription}
                  claimAmount={claim.claimAmount}
                  claimStatus={claim.claimStatus}
                  submissionDate={claim.submissionDate}
                  approvedDate={claim.approvedDate}
                  approvedAmount={claim.approvedAmount}
                  insurerComments={claim.insurerComments}
                />
            ))}
          </div>
        </div>
      )}
                  
            </div>
      );
};

export default PatientDashboard;