  
// import { useState, useEffect } from 'react';
// import { useNavigate, useLocation, NavLink } from 'react-router-dom';
// import {
//   ChevronDownIcon,
//   ChevronUpIcon,
//   HomeIcon,
//   Cog6ToothIcon,
//   UsersIcon,
//   ArrowRightOnRectangleIcon,
//   BuildingStorefrontIcon,
// } from '@heroicons/react/24/outline';

// function Sidebars() {
//   const [open, setOpen] = useState(false);
//   const [role, setRole] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const user = localStorage.getItem('user');
//     if (user) {
//       try {
//         const parsed = JSON.parse(user);
//         const userRole = parsed.role?.toLowerCase();
//         if (['admin', 'manager', 'staff'].includes(userRole)) {
//           setRole(userRole);
//         } else {
//           console.warn('Invalid or unknown role:', parsed.role);
//         }
//       } catch (e) {
//         console.error('Failed to parse user role:', e);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (location.pathname.includes('settings')) {
//       setOpen(true);
//     }
//   }, [location.pathname]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   const renderAdminLinks = () => (
//     <>
//       <NavLink
//         to="admin/brand"
//         className={({ isActive }) =>
//           `flex items-center gap-2 p-3 rounded text-xs ${
//             isActive ? 'bg-cyan-800 text-white' : 'hover:bg-cyan-800 text-white'
//           }`
//         }
//       >
//         <BuildingStorefrontIcon className="w-5 h-5" />
//         Brand
//       </NavLink>

//       <button
//         onClick={() => setOpen(!open)}
//         className="w-full flex items-center justify-between p-3 rounded hover:bg-cyan-800 text-white text-xs"
//       >
//         <span className="flex items-center gap-2">
//           <Cog6ToothIcon className="w-5 h-5" />
//           Setting
//         </span>
//         {open ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
//       </button>

//       {open && (
//         <div className="ml-8 mt-1 space-y-1">
//           <NavLink
//             to="admin/settings/gender"
//             className={({ isActive }) =>
//               `block px-3 py-2 rounded text-xs ${
//                 isActive ? 'bg-cyan-800 text-white' : 'hover:bg-cyan-800 text-white'
//               }`
//             }
//           >
//             Gender
//           </NavLink>
//           <NavLink
//             to="admin/settings/role"
//             className={({ isActive }) =>
//               `block px-3 py-2 rounded text-xs ${
//                 isActive ? 'bg-cyan-800 text-white' : 'hover:bg-cyan-800 text-white'
//               }`
//             }
//           >
//             Roles
//           </NavLink>
//           <NavLink
//             to="admin/settings/permission"
//             className={({ isActive }) =>
//               `block px-3 py-2 rounded text-xs ${
//                 isActive ? 'bg-cyan-800 text-white' : 'hover:bg-cyan-800 text-white'
//               }`
//             }
//           >
//             Permission
//           </NavLink>
//           <NavLink
//             to="admin/settings/role-permission"
//             className={({ isActive }) =>
//               `block px-3 py-2 rounded text-xs ${
//                 isActive ? 'bg-cyan-800 text-white' : 'hover:bg-cyan-800 text-white'
//               }`
//             }
//           >
//             Roles Permission
//           </NavLink>
//         </div>
//       )}

//       <NavLink
//         to="admin/manage-users"
//         className={({ isActive }) =>
//           `flex items-center gap-2 p-3 rounded text-xs ${
//             isActive ? 'bg-cyan-800 text-white' : 'hover:bg-cyan-800 text-white'
//           }`
//         }
//       >
//         <UsersIcon className="w-5 h-5" />
//         Manage Users
//       </NavLink>
//     </>
//   );

//   const renderManagerLinks = () => (
//     <NavLink
//       to="manager/brand"
//       className={({ isActive }) =>
//         `flex items-center gap-2 p-3 rounded text-xs ${
//           isActive ? 'bg-cyan-800 text-white' : 'hover:bg-cyan-800 text-white'
//         }`
//       }
//     >
//       <BuildingStorefrontIcon className="w-5 h-5" />
//       Brand
//     </NavLink>
//   );

//   const renderStaffLinks = () => (
//     <NavLink
//       to="staff/brand"
//       className={({ isActive }) =>
//         `flex items-center gap-2 p-3 rounded text-xs ${
//           isActive ? 'bg-cyan-800 text-white' : 'hover:bg-cyan-800 text-white'
//         }`
//       }
//     >
//       <BuildingStorefrontIcon className="w-5 h-5" />
//       Brand
//     </NavLink>
//   );

//   return (
//     <aside className="w-64 bg-gray-900 text-white hidden lg:block shadow-md h-screen font-poppins">
//       <nav className="p-4 space-y-2">
//         <NavLink
//           to="/dashboard"
//           className={({ isActive }) =>
//             `flex items-center gap-2 p-3 rounded text-xs ${
//               isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 text-white'
//             }`
//           }
//         >
//           <HomeIcon className="w-5 h-5" />
//           Dashboard
//         </NavLink>

//         {role === 'admin' && renderAdminLinks()}
//         {role === 'manager' && renderManagerLinks()}
//         {role === 'staff' && renderStaffLinks()}

//         <div className="border-t border-gray-700 mt-4 pt-4">
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 w-full p-3 rounded text-white hover:bg-red-600 transition text-xs"
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
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
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
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsed = JSON.parse(user);
        const userRole = parsed.role?.toLowerCase();
        if (['admin', 'manager', 'staff'].includes(userRole)) {
          setRole(userRole);
        } else {
          console.warn('Invalid or unknown role:', parsed.role);
        }
      } catch (e) {
        console.error('Failed to parse user role:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (location.pathname.includes('settings')) {
      setOpen(true);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const renderAdminLinks = () => (
    <>
      <NavLink
        to="/dashboard/admin/brand"
        className={({ isActive }) =>
          `flex items-center gap-2 p-3 rounded text-xs ${
            isActive ? 'bg-cyan-800 text-white' : 'hover:bg-cyan-800 text-white'
          }`
        }
      >
        <BuildingStorefrontIcon className="w-5 h-5" />
        Brand
      </NavLink>

      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-3 rounded hover:bg-cyan-800 text-white text-xs"
      >
        <span className="flex items-center gap-2">
          <Cog6ToothIcon className="w-5 h-5" />
          Setting
        </span>
        {open ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
      </button>

      {open && (
        <div className="ml-8 mt-1 space-y-1">
          <NavLink to="/dashboard/admin/settings/gender" className={navClass}>Gender</NavLink>
          <NavLink to="/dashboard/admin/settings/role" className={navClass}>Roles</NavLink>
          <NavLink to="/dashboard/admin/settings/permission" className={navClass}>Permission</NavLink>
          <NavLink to="/dashboard/admin/settings/role-permission" className={navClass}>Roles Permission</NavLink>
        </div>
      )}

      <NavLink
        to="/dashboard/admin/manage-users"
        className={({ isActive }) =>
          `flex items-center gap-2 p-3 rounded text-xs ${
            isActive ? 'bg-cyan-800 text-white' : 'hover:bg-cyan-800 text-white'
          }`
        }
      >
        <UsersIcon className="w-5 h-5" />
        Manage Users
      </NavLink>
    </>
  );

  const navClass = ({ isActive }) =>
    `block px-3 py-2 rounded text-xs ${
      isActive ? 'bg-cyan-800 text-white' : 'hover:bg-cyan-800 text-white'
    }`;

  const renderManagerLinks = () => (
    <NavLink
      to="/dashboard/manager/brand"
      className={({ isActive }) =>
        `flex items-center gap-2 p-3 rounded text-xs ${
          isActive ? 'bg-cyan-800 text-white' : 'hover:bg-cyan-800 text-white'
        }`
      }
    >
      <BuildingStorefrontIcon className="w-5 h-5" />
      Brand
    </NavLink>
  );

  const renderStaffLinks = () => (
    <NavLink
      to="/dashboard/staff/brand"
      className={({ isActive }) =>
        `flex items-center gap-2 p-3 rounded text-xs ${
          isActive ? 'bg-cyan-800 text-white' : 'hover:bg-cyan-800 text-white'
        }`
      }
    >
      <BuildingStorefrontIcon className="w-5 h-5" />
      Brand
    </NavLink>
  );

  return (
    <aside className="w-64 bg-gray-900 text-white hidden lg:block shadow-md h-screen font-poppins">
      <nav className="p-4 space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-2 p-3 rounded text-xs ${
              isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 text-white'
            }`
          }
        >
          <HomeIcon className="w-5 h-5" />
          Dashboard
        </NavLink>

        {role === 'admin' && renderAdminLinks()}
        {role === 'manager' && renderManagerLinks()}
        {role === 'staff' && renderStaffLinks()}

        <div className="border-t border-gray-700 mt-4 pt-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full p-3 rounded text-white hover:bg-red-600 transition text-xs"
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
