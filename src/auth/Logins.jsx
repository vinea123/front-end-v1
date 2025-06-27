// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setError('');

//     try {
//       const response = await fetch('http://127.0.0.1:8000/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       let result;
//       try {
//         result = await response.json();
//       } catch (jsonError) {
//         console.error('Failed to parse JSON:', jsonError);
//         setError('Invalid server response');
//         return;
//       }

//       console.log('Response status:', response.status);
//       console.log('Response JSON:', result);

//       if (response.ok && result.token) {
//         // Store token and user info
//         localStorage.setItem('token', result.token);
//         localStorage.setItem('user', JSON.stringify({
//           email: result.email,
//           role: result.role
//         }));

//         console.log('Token and user stored');
//         setMessage(result.message || 'Login successful!');
//         setTimeout(() => navigate('/dashboard'), 500);
//       } else {
//         setError(result.message || 'Login failed');
//       }
//     } catch (err) {
//       console.error('Fetch error:', err);
//       setError('Login failed. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
//           Login to Your Account
//         </h2>

//         {message && (
//           <div className="mt-4 px-4 py-2 bg-green-100 text-green-800 border border-green-300 rounded-md text-sm text-center">
//             {message}
//           </div>
//         )}

//         {error && (
//           <div className="mt-4 px-4 py-2 bg-red-100 text-red-800 border border-red-300 rounded-md text-sm text-center">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6 mt-4">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               required
//               value={formData.email}
//               onChange={handleChange}
//               className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//               placeholder="Enter your email"
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               required
//               value={formData.password}
//               onChange={handleChange}
//               className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//               placeholder="Enter your password"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;



import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDeviceId } from '../utils/device'; // <== Add this

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const deviceId = getDeviceId(); // <== Get or create device_id

    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, device_id: deviceId }), // <== send device_id
      });

      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        console.error('Failed to parse JSON:', jsonError);
        setError('Invalid server response');
        return;
      }

      if (response.ok && result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify({
          email: result.email,
          role: result.role
        }));

        setMessage(result.message || 'Login successful!');
        setTimeout(() => navigate('/dashboard'), 500);
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
          Login to Your Account
        </h2>

        {message && (
          <div className="mt-4 px-4 py-2 bg-green-100 text-green-800 border border-green-300 rounded-md text-sm text-center">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-4 px-4 py-2 bg-red-100 text-red-800 border border-red-300 rounded-md text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
