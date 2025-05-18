import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void;
}

function Login({ setIsAuthenticated }: LoginProps) {
  const navigate = useNavigate();

  const onSuccess = (credentialResponse: any) => {
    console.log('Login Success:', credentialResponse);
    setIsAuthenticated(true);
    navigate('/extract'); // Redirect to extraction page
  };

  const onError = () => {
    console.log('Login Failed');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Welcome to Transcript Extractor</h1>
        <p className="mb-6">Please log in with your Google account to start extracting transcripts.</p>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onError}
        />
      </div>
    </div>
  );
}

export default Login;