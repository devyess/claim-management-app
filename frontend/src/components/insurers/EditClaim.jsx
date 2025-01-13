import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import { AuthContext } from '../../context/AuthContext';

const EditClaim = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [claim, setClaim] = useState({
    userName: '',
    email: '',
    claimDescription: '',
    claimAmount: '',
    claimStatus: '',
    approvedAmount: '',
    insurerComments: '',
    claimFile: null // Initialize claimFile as null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { insurerAuth } = useContext(AuthContext);

  useEffect(() => {
    const fetchClaim = async () => {
      try {
        const response = await axios.get(`/insurers/claims/${id}`, {
          headers: {
            Authorization: `Bearer ${insurerAuth}`
          }
        });
        setClaim(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError('Failed to fetch claim details');
        setLoading(false);
      }
    };

    fetchClaim();
  }, [id, insurerAuth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/insurers/claims/${id}`, {
        claimStatus: claim.claimStatus,
        approvedAmount: claim.approvedAmount,
        insurerComments: claim.insurerComments
      }, {
        headers: {
          Authorization: `Bearer ${insurerAuth}`
        }
      });
      setClaim(response.data.claim);
      navigate('/insurers/dashboard');
    } catch (err) {
      console.log(err);
      setError('Failed to update claim');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClaim({ ...claim, [name]: value });
  };

  const handleDownloadFile = async () => {
    try {
      const response = await axios.get(`/insurers/claims/${id}/download`, {
        headers: {
          Authorization: `Bearer ${insurerAuth}`
        },
        responseType: 'blob' // Ensure file is downloaded as a binary blob
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'claim_file.pdf'); // Set desired file name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error downloading the file", err);
      setError("Failed to download the file");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ backgroundColor: "#79D7BE" }} className='w-full min-h-screen flex items-center justify-center'>
      <div className="bg-white p-8 rounded-lg shadow-lg w-fit h-fit">
        <h1 className="text-3xl font-bold text-center mb-4">Edit Claim</h1>
        <form className='flex flex-col items-center' onSubmit={handleSubmit}>
          <button
            onClick={handleDownloadFile}
            className="bg-green-500 text-white p-2 w-80 mt-4 rounded transition-transform transform hover:scale-105"
          >
            Download Claim File
          </button>
          <input
            type="text"
            placeholder="User Name"
            value={claim.userName}
            className="border border-gray-400 p-2 w-80 mt-4 rounded"
            readOnly
          />
          <input
            type="email"
            placeholder="Email"
            value={claim.email}
            className="border border-gray-400 p-2 w-80 mt-4 rounded"
            readOnly
          />
          <textarea
            placeholder="Claim Description"
            value={claim.claimDescription}
            className="border border-gray-400 p-2 w-80 mt-4 rounded"
            readOnly
          />
          <input
            type="number"
            placeholder="Claim Amount"
            value={claim.claimAmount}
            className="border border-gray-400 p-2 w-80 mt-4 rounded"
            readOnly
          />
          <select
            name="claimStatus"
            value={claim.claimStatus}
            onChange={handleChange}
            className="border border-gray-400 p-2 w-80 mt-4 rounded"
          >
            <option value="Approved">Approve</option>
            <option value="Rejected">Reject</option>
          </select>
          <input
            type="number"
            name="approvedAmount"
            placeholder="Approved Amount"
            value={claim.approvedAmount}
            onChange={handleChange}
            className="border border-gray-400 p-2 w-80 mt-4 rounded"
          />
          <textarea
            name="insurerComments"
            placeholder="Insurer Comments"
            value={claim.insurerComments}
            onChange={handleChange}
            className="border border-gray-400 p-2 w-80 mt-4 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 w-80 mt-4 rounded transition-transform transform hover:scale-105"
          >
            Update Claim
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditClaim;