import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import { AuthContext } from '../../context/AuthContext';
import ClaimCard from './ClaimCard.jsx';

const InsurerDashboard = () => {
  const [showClaims, setShowClaims] = useState(true);
  const [claims, setClaims] = useState([]);

  // Filter states
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [amountFilter, setAmountFilter] = useState('');

  const navigate = useNavigate();
  const { insurerAuth, insurerLogout } = useContext(AuthContext);

  // Existing functionality: Logout
  const handleLogout = async () => {
    try {
      await axios.post('/insurers/logout', {}, {
        headers: {
          Authorization: `Bearer ${insurerAuth}`
        }
      });
      insurerLogout();
      navigate('/insurers/login');
    } catch (err) {
      console.log(err);
    }
  };

  // Existing functionality: Fetch claims
  const handleGetClaims = async () => {
    try {
      const response = await axios.get('/insurers/claims', {
        headers: {
          Authorization: `Bearer ${insurerAuth}`
        }
      });
      setClaims(response.data.claim);
      setShowClaims(true);
    } catch (err) {
      console.log(err);
    }
  };

  // Filter logic
  const filteredClaims = claims.filter(claim => {
    // Status filter
    const statusMatch = !statusFilter || claim.claimStatus === statusFilter;

    // Date filter (submission date >= selected date)
    let dateMatch = true;
    if (dateFilter) {
      const selectedDate = new Date(dateFilter);
      const claimDate = new Date(claim.submissionDate);
      dateMatch = claimDate >= selectedDate;
    }

    // Amount filter (claimAmount <= selected amount)
    let amountMatch = true;
    if (amountFilter) {
      amountMatch = Number(claim.claimAmount) <= Number(amountFilter);
    }

    return statusMatch && dateMatch && amountMatch;
  });

  return (
    <div style={{ backgroundColor: "#79D7BE" }} className="w-full min-h-screen">
      <br />
      <h1 className="text-4xl text-center font-bold text-gray-800">Insurer Dashboard</h1>
      <br />
      <nav className="ml-10 justify-center">
        <button
          style={{ backgroundColor: "#F6F4F0" }}
          className="mr-4 p-2 rounded-lg transition-transform transform hover:scale-105"
          onClick={handleGetClaims}
        >
          View Claims
        </button>

        <button
          style={{ backgroundColor: "#F6F4F0" }}
          className="mr-4 p-2 rounded-lg transition-transform transform hover:scale-105"
          onClick={handleLogout}
        >
          Logout
        </button>

        <button
          style={{ backgroundColor: "#F6F4F0" }}
          className="mr-4 p-2 rounded-lg transition-transform transform hover:scale-105"
          onClick={() => { navigate('/patients/login'); }}
        >
          Login as Patient
        </button>
      </nav>

      {/* Filter Form */}
      <div className="ml-10 mt-5">
        <h3 className="text-lg font-bold">Filters</h3>
        <label className="mr-2">Status:</label>
        <select
          className="border p-1 rounded mr-4"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <label className="mr-2">Submission Date:</label>
        <input
          type="date"
          className="border p-1 rounded mr-4"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />

        <label className="mr-2">Claim Amount:</label>
        <input
          type="number"
          className="border p-1 rounded"
          value={amountFilter}
          onChange={(e) => setAmountFilter(e.target.value)}
        />
      </div>

      {/* Claims Display */}
      {showClaims && (
        <div className="flex flex-wrap justify-center mt-6 gap-3">
          {filteredClaims.map((claim) => (
            <ClaimCard
              key={claim._id}
              id={claim._id}
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
      )}
    </div>
  );
};

export default InsurerDashboard;