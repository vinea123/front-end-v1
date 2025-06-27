import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Projected Budget',
        data: [500, 600, 700, 400, 300, 450, 650, 600, 700, 800, 750, 600],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Actual Spend',
        data: [400, 500, 600, 300, 200, 300, 400, 500, 600, 700, 650, 500],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Project Budget Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (val) => `$${val}k`,
        },
      },
    },
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-white border border-gray-200 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-500">Total Budget</h3>
          <p className="text-2xl font-bold text-gray-800">$372k</p>
        </div>
        <div className="text-center p-4 bg-white border border-gray-200 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-500">Total Spend</h3>
          <p className="text-2xl font-bold text-gray-800">$87k</p>
        </div>
        <div className="text-center p-4 bg-white border border-gray-200 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-500">Remaining</h3>
          <p className="text-2xl font-bold text-gray-800">$58k</p>
        </div>
        <div className="text-center p-4 bg-white border border-gray-200 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-500">Over Budget</h3>
          <p className="text-2xl font-bold text-gray-800">$172k</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white border border-gray-100 rounded-xl shadow p-6">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default Dashboard;
