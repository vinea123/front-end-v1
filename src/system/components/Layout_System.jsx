import { Outlet } from 'react-router-dom';
import Headers from './Headers';
import Sidebars from './Sidebars';
import useAutoLogout from '../utils/useAutoLogout';

function Layouts() {
  useAutoLogout();

  return (
    <div className="flex flex-col h-screen overflow-hidden">
  {/* Header stays fixed at top */}
  <Headers className="flex-none" />

  <div className="flex flex-1 overflow-hidden">
    {/* Sidebar stays fixed; if it needs its own scroll, add overflow-y-auto here */}
    <Sidebars className="flex-none overflow-y-auto" />

    {/* Main content scrolls independently */}
    <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
      <Outlet />
    </main>
  </div>
</div>

  );
}

export default Layouts;
