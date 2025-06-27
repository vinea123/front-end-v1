// // import { useState } from 'react';
// // import {
// //   ChevronDownIcon,
// //   ChevronUpIcon,
// //   HomeIcon,
// //   CalendarDaysIcon,
// //   Cog6ToothIcon,          // Better for Settings
// //   BellIcon,
// //   UsersIcon,
// //   ArrowRightOnRectangleIcon,
// // } from '@heroicons/react/24/outline';

// // function Sidebars() {
// //   const [open, setOpen] = useState(false);

// //   return (
// //     <aside className="w-64 bg-white border-r hidden lg:block">
// //       <nav className="p-4 space-y-2">
// //         <a
// //           href="#"
// //           className="flex items-center gap-2 p-3 rounded hover:bg-cyan-100 hover:text-black text-slate-700"
// //         >
// //           <HomeIcon className="w-5 h-5" />
// //           Dashboard
// //         </a>

// //         {/* Dropdown for Settings */}
// //         <div>
// //           <button
// //             onClick={() => setOpen(!open)}
// //             className="w-full flex items-center justify-between p-3 rounded hover:bg-cyan-100 hover:text-black text-slate-700"
// //           >
// //             <span className="flex items-center gap-2">
// //               <Cog6ToothIcon className="w-5 h-5" />
// //               Setting
// //             </span>
// //             {open ? (
// //               <ChevronUpIcon className="w-5 h-5" />
// //             ) : (
// //               <ChevronDownIcon className="w-5 h-5" />
// //             )}
// //           </button>
// //           {open && (
// //             <div className="ml-8 mt-1 space-y-1">
// //               <a
// //                 href="#"
// //                 className="block px-3 py-2 rounded hover:bg-cyan-100 text-slate-700 text-sm"
// //               >
// //                 Gender
// //               </a>
// //               <a
// //                 href="#"
// //                 className="block px-3 py-2 rounded hover:bg-cyan-100 text-slate-700 text-sm"
// //               >
// //                 Roles
// //               </a>
// //               <a
// //                 href="#"
// //                 className="block px-3 py-2 rounded hover:bg-cyan-100 text-slate-700 text-sm"
// //               >
// //                 Permission
// //               </a>
// //               <a
// //                 href="#"
// //                 className="block px-3 py-2 rounded hover:bg-cyan-100 text-slate-700 text-sm"
// //               >
// //                 Roles Permission
// //               </a>
// //             </div>
// //           )}
// //         </div>

// //         <a
// //           href="#"
// //           className="flex items-center gap-2 p-3 rounded hover:bg-cyan-100 hover:text-black text-slate-700"
// //         >
// //           <UsersIcon className="w-5 h-5" />
// //           Manage Users
// //         </a>

// //         {/* Logout Button */}
// //         <div className="border-t mt-4 pt-4">
// //           <button
// //             onClick={() => {
// //               // You can add logout logic here
// //               console.log("Logging out...");
// //             }}
// //             className="flex items-center gap-2 w-full p-3 rounded text-red-600 hover:bg-red-100 transition"
// //           >
// //             <ArrowRightOnRectangleIcon className="w-5 h-5" />
// //             Logout
// //           </button>
// //         </div>
// //       </nav>
// //     </aside>
// //   );
// // }

// // export default Sidebars;



// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   ChevronDownIcon,
//   ChevronUpIcon,
//   HomeIcon,
//   Cog6ToothIcon,
//   UsersIcon,
//   ArrowRightOnRectangleIcon,
// } from '@heroicons/react/24/outline';

// function Sidebars() {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');  // clear auth token
//     navigate('/'); // redirect to login page
//   };

//   return (
//     <aside className="w-64 bg-white border-r hidden lg:block">
//       <nav className="p-4 space-y-2">
//         <a
//           href="#"
//           className="flex items-center gap-2 p-3 rounded hover:bg-cyan-100 hover:text-black text-slate-500"
//         >
//           <HomeIcon className="w-5 h-5" />
//           Dashboard
//         </a>

//         {/* Dropdown for Settings */}
//         <div>
//           <button
//             onClick={() => setOpen(!open)}
//             className="w-full flex items-center justify-between p-3 rounded hover:bg-cyan-100 hover:text-black text-slate-500"
//           >
//             <span className="flex items-center gap-2">
//               <Cog6ToothIcon className="w-5 h-5" />
//               Setting
//             </span>
//             {open ? (
//               <ChevronUpIcon className="w-5 h-5" />
//             ) : (
//               <ChevronDownIcon className="w-5 h-5" />
//             )}
//           </button>
//           {open && (
//             <div className="ml-8 mt-1 space-y-1">
//               <a
//                 href="#"
//                 className="block px-3 py-2 rounded hover:bg-cyan-100 text-slate-500 text-sm"
//               >
//                 Gender
//               </a>
//               <a
//                 href="#"
//                 className="block px-3 py-2 rounded hover:bg-cyan-100 text-slate-500 text-sm"
//               >
//                 Roles
//               </a>
//               <a
//                 href="#"
//                 className="block px-3 py-2 rounded hover:bg-cyan-100 text-slate-500 text-sm"
//               >
//                 Permission
//               </a>
//               <a
//                 href="#"
//                 className="block px-3 py-2 rounded hover:bg-cyan-100 text-slate-500 text-sm"
//               >
//                 Roles Permission
//               </a>
//             </div>
//           )}
//         </div>

//         <a
//           href="#"
//           className="flex items-center gap-2 p-3 rounded hover:bg-cyan-100 hover:text-black text-slate-500"
//         >
//           <UsersIcon className="w-5 h-5" />
//           Manage Users
//         </a>

//         {/* Logout Button */}
//         <div className="border-t mt-4 pt-4">
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 w-full p-3 rounded text-red-500 hover:bg-red-100 transition"
//           >
//             <ArrowRightOnRectangleIcon className="w-5 h-5" />
//             Logout
//           </button>
//         </div>
//       </nav>
//     </aside>
//   );
// }

// export default Sidebars;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  HomeIcon,
  Cog6ToothIcon,
  UsersIcon,
  ArrowRightOnRectangleIcon,
  BuildingStorefrontIcon,
} from '@heroicons/react/24/outline';

function Sidebars() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(null); // null initially
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsed = JSON.parse(user);
        const userRole = parsed.role?.toLowerCase();
        if (['admin', 'manager', 'staff'].includes(userRole)) {
          setRole(userRole);
        } else {
          console.warn("Invalid or unknown role:", parsed.role);
        }
      } catch (e) {
        console.error("Failed to parse user role:", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const renderAdminLinks = () => (
    <>
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between p-3 rounded hover:bg-cyan-100 text-slate-500"
        >
          <span className="flex items-center gap-2">
            <Cog6ToothIcon className="w-5 h-5" />
            Setting
          </span>
          {open ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
        </button>
        {open && (
          <div className="ml-8 mt-1 space-y-1">
            <a href="#" className="block px-3 py-2 rounded hover:bg-cyan-100 text-sm text-slate-500">Gender</a>
            <a href="#" className="block px-3 py-2 rounded hover:bg-cyan-100 text-sm text-slate-500">Roles</a>
            <a href="#" className="block px-3 py-2 rounded hover:bg-cyan-100 text-sm text-slate-500">Permission</a>
            <a href="#" className="block px-3 py-2 rounded hover:bg-cyan-100 text-sm text-slate-500">Roles Permission</a>
          </div>
        )}
      </div>

      <a href="#" className="flex items-center gap-2 p-3 rounded hover:bg-cyan-100 text-slate-500">
        <UsersIcon className="w-5 h-5" />
        Manage Users
      </a>

      <a href="#" className="flex items-center gap-2 p-3 rounded hover:bg-cyan-100 text-slate-500">
        <BuildingStorefrontIcon className="w-5 h-5" />
        Brand
      </a>
    </>
  );

  const renderManagerLinks = () => (
    <>
      <a href="#" className="flex items-center gap-2 p-3 rounded hover:bg-cyan-100 text-slate-500">
        <UsersIcon className="w-5 h-5" />
        Manage Users
      </a>
      <a href="#" className="flex items-center gap-2 p-3 rounded hover:bg-cyan-100 text-slate-500">
        <BuildingStorefrontIcon className="w-5 h-5" />
        Brand
      </a>
    </>
  );

  const renderStaffLinks = () => (
    <a href="#" className="flex items-center gap-2 p-3 rounded hover:bg-cyan-100 text-slate-500">
      <BuildingStorefrontIcon className="w-5 h-5" />
      Brand
    </a>
  );

  return (
    <aside className="w-64 bg-white border-r hidden lg:block">
      <nav className="p-4 space-y-2">
        <a href="#" className="flex items-center gap-2 p-3 rounded hover:bg-cyan-100 text-slate-500">
          <HomeIcon className="w-5 h-5" />
          Dashboard
        </a>

        {/* Render only when role is available */}
        {role === 'admin' && renderAdminLinks()}
        {role === 'manager' && renderManagerLinks()}
        {role === 'staff' && renderStaffLinks()}

        <div className="border-t mt-4 pt-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full p-3 rounded text-red-500 hover:bg-red-100 transition"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebars;
