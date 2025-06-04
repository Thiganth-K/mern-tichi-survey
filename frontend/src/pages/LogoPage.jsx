import { useNavigate } from "react-router-dom";
import logo from '../assets/tichi-logo.png';

export default function LogoPage() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-2">
      <div className="card bg-base-100 shadow-xl p-8 w-full max-w-sm sm:max-w-md">
        <img
          src={logo}
          alt="Tichi Logo"
          className="w-28 h-28 mx-auto mb-6 object-contain"
          draggable={false}
        />
        <h1 className="text-4xl font-extrabold text-primary mb-4 text-center tracking-tight">
          Tichi
        </h1>
        <p className="text-base text-center text-base-content mb-6">
          Welcome to Tichi! Start your journey by clicking below.
        </p>
        <button
          className="btn btn-primary w-full text-lg"
          onClick={() => navigate("/home")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}