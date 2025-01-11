import React from 'react';
import { Link } from 'react-router-dom';

const ClaimCard = ({ id, userName, email, claimDescription, claimAmount, claimStatus, submissionDate, approvedDate, approvedAmount, insurerComments, file }) => {
  return (
    <Link to={`/claims/edit/${id}`} className="no-underline">
      <div className="p-4 w-fit h-fit bg-white rounded-lg shadow-md mb-4 cursor-pointer hover:shadow-lg transition-shadow duration-300">
        <p><strong>User Name:</strong> {userName}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Claim Description:</strong> {claimDescription}</p>
        <p><strong>Claim Amount:</strong> ${claimAmount}</p>
        <p><strong>Claim Status:</strong> {claimStatus}</p>
        <p><strong>Submission Date:</strong> {submissionDate}</p>
        <p><strong>File:</strong> {userName + "_file"}</p>
        {approvedDate && <p><strong>Approved Date:</strong> {approvedDate}</p>}
        {approvedAmount && <p><strong>Approved Amount:</strong> ${approvedAmount}</p>}
        {insurerComments && <p><strong>Insurer Comments:</strong> {insurerComments}</p>}
      </div>
    </Link>
  );
};

export default ClaimCard;