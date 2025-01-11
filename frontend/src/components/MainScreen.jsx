import { useNavigate } from 'react-router-dom';

const MainScreen = () => {
  const navigate = useNavigate();
  return (
    <div style={{ backgroundColor: '#79D7BE' }} className="w-full min-h-screen flex flex-col items-center justify-center">
      <button
        style={{ backgroundColor: "#F6F4F0" }}
        className="mb-4 p-2 rounded-lg transition-transform transform hover:scale-105"
        onClick={() => { navigate('/patients/register') }}
      >
        Begin as a Patient
      </button>
      <button
        style={{ backgroundColor: "#F6F4F0" }}
        className="p-2 rounded-lg transition-transform transform hover:scale-105"
        onClick={() => { navigate('/insurers/register') }}
      >
        Begin as an Insurer
      </button>
    </div>
  );
};

export default MainScreen;