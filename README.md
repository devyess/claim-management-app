# Claim Management App

## Overview

The Claim Management App is a web application designed to manage insurance claims. It allows patients to register, log in, and submit claims, while insurers can log in, view, and manage these claims. The application is divided into two main parts: the backend (Node.js/Express) and the frontend (React).

## Features

- **Patient Registration and Login**: Patients can register and log in to the system.
- **Insurer Registration and Login**: Insurers can register and log in to the system.
- **Claim Submission**: Patients can submit claims with descriptions and file attachments.
- **Claim Management**: Insurers can view, edit, and manage claims.
- **File Upload and Download**: Patients can upload files with their claims, and insurers can download these files.



## Prerequisites

- Node.js (v14 or later)
- MongoDB
- Redis

## Setup Instructions

### Backend

1. **Navigate to the backend directory**:
    ```sh
    cd backend
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Create a `.env` file** in the [backend](http://_vscodecontentref_/1) directory and add the following environment variables:
    ```env
    JWT_SECRET=your_jwt_secret
    MONGO_URI=your_mongo_uri
    PORT=3000
    REDIS_HOST=your_redis_host
    REDIS_PORT=your_redis_port
    REDIS_PASSWORD=your_redis_password
    ```

4. **Start the backend server**:
    ```sh
    npm start
    ```

### Frontend

1. **Navigate to the frontend directory**:
    ```sh
    cd frontend
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Start the frontend development server**:
    ```sh
    npm run dev
    ```

## Usage

1. **Open your browser** and navigate to `http://localhost:3000`.
2. **Register and log in** as a patient or insurer.
3. **Submit claims** as a patient.
4. **View and manage claims** as an insurer.

## API Endpoints

### Patient Routes

- `POST /patients/register`: Register a new patient.
- `POST /patients/login`: Log in as a patient.
- `POST /patients/logout`: Log out as a patient.
- `POST /patients/claim`: Submit a new claim.
- `GET /patients/claimStatus`: View the status of submitted claims.

### Insurer Routes

- `POST /insurers/register`: Register a new insurer.
- `POST /insurers/login`: Log in as an insurer.
- `POST /insurers/logout`: Log out as an insurer.
- `GET /insurers/claims`: View all claims.
- `PUT /insurers/claims/:id`: Edit a claim.
- `GET /insurers/claims/:id`: Get details of a specific claim.

