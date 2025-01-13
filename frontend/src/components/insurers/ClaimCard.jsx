import React from 'react';
import { Link } from 'react-router-dom';
import axios from '../../config/axios';
import { FaDownload } from 'react-icons/fa';

const ClaimCard = ({ 
  id, 
  userName, 
  email, 
  claimDescription, 
  claimAmount, 
  claimStatus, 
  submissionDate, 
  approvedDate, 
  approvedAmount, 
  insurerComments, 
  claimFile,
  insurerAuth 
}) => {

  const handleDownload = async (e) => {
    e.preventDefault(); // Prevent Link navigation
    try {
      const response = await axios.get(`/api/claims/${id}/download`, {
        headers: {
          Authorization: `Bearer ${insurerAuth}`
        },
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${userName}_claim_documents.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading file:", err);
    }
  };

  return (
    <Link to={`/claims/edit/${id}`} className="no-underline">
      <div className="p-4 w-fit h-fit bg-white rounded-lg shadow-md mb-4 cursor-pointer hover:shadow-lg transition-shadow duration-300">
        <div className="flex justify-between items-start">
          <div>
            <p><strong>User Name:</strong> {userName}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Claim Description:</strong> {claimDescription}</p>
            <p><strong>Claim Amount:</strong> ${claimAmount}</p>
            <p><strong>Claim Status:</strong> {claimStatus}</p>
            <p><strong>Submission Date:</strong> {submissionDate}</p>
            {approvedDate && <p><strong>Approved Date:</strong> {approvedDate}</p>}
            {approvedAmount && <p><strong>Approved Amount:</strong> ${approvedAmount}</p>}
            {insurerComments && <p><strong>Insurer Comments:</strong> {insurerComments}</p>}
          </div>
          
          {claimFile && (
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              <FaDownload />
              Download Documents
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ClaimCard;