import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./components/Loading"; // Make sure you have this component

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    // Set a 1-second minimum loading time
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    if (!token) {
      navigate("/login");
    }

    return () => clearTimeout(loadingTimer);
  }, [navigate]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
        <Loading />
      </div>
    );
  }

  return (
    <div className="font-poppins">
      <div className="p-4 bg-white shadow rounded-lg">
        <h1 className="text-xl font-semibold text-gray-800">
          Welcome to the Dashboard
        </h1>
      </div>
    </div>
  );
}

export default Dashboard;