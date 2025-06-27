// import Headers from './Headers';
// import Sidebars from './Sidebars';
// import Dashboard from '../page/Dashboard/Dashboard';
// import AutoLogout from '../utils/useAutoLogout';

// function Layout() {
//   AutoLogouts();
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Headers />

//       <div className="flex flex-1">
//         <Sidebars />

//         <main className="flex-1 p-6 bg-gray-10">
//           <Dashboard />

//         </main>
//       </div>
//     </div>
//   );
// }

// export default Layout;



// src/components/Layout.jsx
import Headers from './Headers';
import Sidebars from './Sidebars';
import Dashboard from '../page/Dashboard/Dashboard';
import useAutoLogout from '../utils/useAutoLogout'; // ✅ custom hook

function Layout() {
  useAutoLogout(); // ✅ correct usage of hook

  return (
    <div className="flex flex-col min-h-screen">
      <Headers />
      <div className="flex flex-1">
        <Sidebars />
        <main className="flex-1 p-6 bg-gray-10">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default Layout;
