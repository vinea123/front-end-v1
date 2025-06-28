// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
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

//   useEffect(() => {
//     const user = localStorage.getItem('user');
//     if (user) {
//       try {
//         const parsed = JSON.parse(user);
//         const userRole = parsed.role?.toLowerCase();
//         if (['admin', 'manager', 'staff'].includes(userRole)) {
//           setRole(userRole);
//         } else {
//           console.warn("Invalid or unknown role:", parsed.role);
//         }
//       } catch (e) {
//         console.error("Failed to parse user role:", e);
//       }
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/');
//   };

//   const renderAdminLinks = () => (
//     <>
//       <div>
//         <button
//           onClick={() => setOpen(!open)}
//           className="w-full flex items-center justify-between p-3 rounded hover:bg-cyan-100 text-slate-500"
//         >
//           <span className="flex items-center gap-2">
//             <Cog6ToothIcon className="w-5 h-5" />
//             Setting
//           </span>
//           {open ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
//         </button>
//         {open && (
//           <div className="ml-8 mt-1 space-y-1">
//             <Link to="settings/genders" className="block px-3 py-2 rounded hover:bg-cyan-100 text-sm text-slate-500">Gender</Link>
//             <Link to="settings/roles" className="block px-3 py-2 rounded hover:bg-cyan-100 text-sm text-slate-500">Roles</Link>
//             <Link to="settings/permissions" className="block px-3 py-2 rounded hover:bg-cyan-100 text-sm text-slate-500">Permission</Link>
//             <Link to="settings/roles-permissions" className="block px-3 py-2 rounded hover:bg-cyan-100 text-sm text-slate-500">Roles Permission</Link>
//           </div>
//         )}
//       </div>

//       <Link to="manage-users" className="flex items-center gap-2 p-3 rounded hover:bg-cyan-100 text-slate-500">
//         <UsersIcon className="w-5 h-5" />
//         Manage Users
//       </Link>

//       <Link to="brands" className="flex items-center gap-2 p-3 rounded hover:bg-cyan-100 text-slate-500">
//         <BuildingStorefrontIcon className="w-5 h-5" />
//         Brand
//       </Link>
//     </>
//   );

//   const renderManagerLinks = () => (
//     <>
//       <Link to="manage-users" className="flex items-center gap-2 p-3 rounded hover:bg-cyan-100 text-slate-500">
//         <UsersIcon className="w-5 h-5" />
//         Manage Users
//       </Link>

//       <Link to="brands" className="flex items-center gap-2 p-3 rounded hover:bg-cyan-100 text-slate-500">
//         <BuildingStorefrontIcon className="w-5 h-5" />
//         Brand
//       </Link>
//     </>
//   );

//   const renderStaffLinks = () => (
//     <Link to="brands" className="flex items-center gap-2 p-3 rounded hover:bg-cyan-100 text-slate-500">
//         <BuildingStorefrontIcon className="w-5 h-5" />
//         Brand
//     </Link>
//   );

//   return (
//     <aside className="w-64 bg-white border-r hidden lg:block shadow-md">
//       <nav className="p-4 space-y-2">
//         <Link to="dashboard/dashboard" className="flex items-center gap-2 p-3 rounded hover:bg-cyan-100 text-slate-500">
//           <HomeIcon className="w-5 h-5" />
//           Dashboard
//         </Link>

//         {/* Render only when role is available */}
//         {role === 'admin' && renderAdminLinks()}
//         {role === 'manager' && renderManagerLinks()}
//         {role === 'staff' && renderStaffLinks()}

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
          console.warn("Invalid or unknown role:", parsed.role);
        }
      } catch (e) {
        console.error("Failed to parse user role:", e);
      }
    }
  }, []);

  useEffect(() => {
    // Auto-expand settings menu if inside /settings/*
    if (location.pathname.includes('settings')) {
      setOpen(true);
    }
  }, [location.pathname]);

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
            <NavLink
              to="settings/genders"
              className={({ isActive }) =>
                `block px-3 py-2 rounded text-sm ${
                  isActive ? 'bg-cyan-100 text-cyan-700 font-medium' : 'hover:bg-cyan-100 text-slate-500'
                }`
              }
            >
              Gender
            </NavLink>
            <NavLink
              to="settings/roles"
              className={({ isActive }) =>
                `block px-3 py-2 rounded text-sm ${
                  isActive ? 'bg-cyan-100 text-cyan-700 font-medium' : 'hover:bg-cyan-100 text-slate-500'
                }`
              }
            >
              Roles
            </NavLink>
            <NavLink
              to="settings/permissions"
              className={({ isActive }) =>
                `block px-3 py-2 rounded text-sm ${
                  isActive ? 'bg-cyan-100 text-cyan-700 font-medium' : 'hover:bg-cyan-100 text-slate-500'
                }`
              }
            >
              Permission
            </NavLink>
            <NavLink
              to="settings/roles-permissions"
              className={({ isActive }) =>
                `block px-3 py-2 rounded text-sm ${
                  isActive ? 'bg-cyan-100 text-cyan-700 font-medium' : 'hover:bg-cyan-100 text-slate-500'
                }`
              }
            >
              Roles Permission
            </NavLink>
          </div>
        )}
      </div>

      <NavLink
        to="manage-users"
        className={({ isActive }) =>
          `flex items-center gap-2 p-3 rounded text-sm ${
            isActive ? 'bg-cyan-100 text-cyan-700 font-medium' : 'hover:bg-cyan-100 text-slate-500'
          }`
        }
      >
        <UsersIcon className="w-5 h-5" />
        Manage Users
      </NavLink>

      <NavLink
        to="brands"
        className={({ isActive }) =>
          `flex items-center gap-2 p-3 rounded text-sm ${
            isActive ? 'bg-cyan-100 text-cyan-700 font-medium' : 'hover:bg-cyan-100 text-slate-500'
          }`
        }
      >
        <BuildingStorefrontIcon className="w-5 h-5" />
        Brand
      </NavLink>
    </>
  );

  const renderManagerLinks = () => (
    <>
      <NavLink
        to="manage-users"
        className={({ isActive }) =>
          `flex items-center gap-2 p-3 rounded text-sm ${
            isActive ? 'bg-cyan-100 text-cyan-700 font-medium' : 'hover:bg-cyan-100 text-slate-500'
          }`
        }
      >
        <UsersIcon className="w-5 h-5" />
        Manage Users
      </NavLink>

      <NavLink
        to="brands"
        className={({ isActive }) =>
          `flex items-center gap-2 p-3 rounded text-sm ${
            isActive ? 'bg-cyan-100 text-cyan-700 font-medium' : 'hover:bg-cyan-100 text-slate-500'
          }`
        }
      >
        <BuildingStorefrontIcon className="w-5 h-5" />
        Brand
      </NavLink>
    </>
  );

  const renderStaffLinks = () => (
    <NavLink
      to="brands"
      className={({ isActive }) =>
        `flex items-center gap-2 p-3 rounded text-sm ${
          isActive ? 'bg-cyan-100 text-cyan-700 font-medium' : 'hover:bg-cyan-100 text-slate-500'
        }`
      }
    >
      <BuildingStorefrontIcon className="w-5 h-5" />
      Brand
    </NavLink>
  );

  return (
    <aside className="w-64 bg-white border-r hidden lg:block shadow-md">
      <nav className="p-4 space-y-2">
        <NavLink
          to="dashboard/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-2 p-3 rounded text-sm ${
              isActive ? 'bg-cyan-100 text-cyan-700 font-medium' : 'hover:bg-cyan-100 text-slate-500'
            }`
          }
        >
          <HomeIcon className="w-5 h-5" />
          Dashboard
        </NavLink>

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
