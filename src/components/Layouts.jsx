
// import { Outlet } from 'react-router-dom';
// import Headers from './Headers';
// import Sidebars from './Sidebars';
// import Dashboard from '../page/Dashboard/Dashboard';
// import useAutoLogout from '../utils/useAutoLogout'; 

// function Layout() {
//   useAutoLogout(); 

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Headers />
//       <div className="flex flex-1">
//         <Sidebars />
//         <main className="flex-1 p-6 bg-gray-10">
//           <Outlet />
//           {/* <Dashboard /> */}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default Layout;


import { Outlet } from 'react-router-dom';
import Headers from './Headers';
import Sidebars from './Sidebars';
import useAutoLogout from '../utils/useAutoLogout';

function Layouts() {
  useAutoLogout();

  return (
    <div className="flex flex-col min-h-screen">
      <Headers />
      <div className="flex flex-1">
        <Sidebars />
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layouts;
