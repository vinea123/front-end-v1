import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [alert, setAlert] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => setAlert({ message: '', type: '' }), 1000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Login response:", result);

      if (!response.ok || !result.token) {
        setAlert({ message: result.message || 'Login failed', type: 'error' });
        return;
      }

      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify({ email: result.email, role: result.role }));
      setAlert({ message: result.message || 'Login successful!', type: 'success' });

      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      setAlert({ message: 'Login failed. Please try again.', type: 'error' });
      console.error('Fetch error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-poppins">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl text-center text-cyan-800 mb-6">
          Login to Your Account
        </h2>

        {/* Alert Box */}
        {alert.message && (
          <div
            className={`mb-4 px-4 py-3 rounded-md text-white text-center ${
              alert.type === 'success'
                ? 'bg-green-300 border-green-600 text-green-800'
                : 'bg-red-400'
            }`}
            role="alert"
          >
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border text-sm border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border text-sm border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-cyan-800 hover:bg-cyan-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
