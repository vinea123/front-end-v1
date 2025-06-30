import { Outlet } from 'react-router-dom';
import Headers from './Headers';
import Sidebars from './Sidebars';
import useAutoLogout from '../utils/useAutoLogout';
import Dashboard from '../page/dashboard/Dashboard';

function Layouts() {
  useAutoLogout();

  return (
    <div className="flex flex-col min-h-screen m-auto">
      <Headers />
      <div className="flex flex-1">
        <Sidebars />
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
          {/* <Dashboard /> */}
        </main>
      </div>
    </div>
  );
}

export default Layouts;
