import { useNavigate } from "react-router-dom";
import logo from '../assets/tichi-logo.png';

export default function LogoPage() {
  const navigate = useNavigate();
  return (
    <div className="logo-container">
      <div className="logo-card">
        <img
          src={logo}
          alt="Tichi Logo"
          className="logo-image"
          draggable={false}
        />
       
        <p className="logo-subtitle">
          Welcome to Tichi! Start your journey by clicking below.
        </p>
        <button
          className="logo-button"
          onClick={() => navigate("/home")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}