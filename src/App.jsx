  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import Logins from './system/auth/Logins';
  import Dashboard from './system/page/dashboard/Dashboard';
  import Layout_System from './system/components/Layout_System'; 
  // admin 
  import Gender_Admin from './system/page/admin/Setting/Gender/Gender_Admin';
  import Role_Admin from './system/page/admin/Setting/roles/Role_Admin';
  import Permission_Admin from './system/page/admin/Setting/permission/Permission_Admin';
  import Role_Permission_Admin from './system/page/admin/Setting/role_permission/Role_Permission_Admin';
  import Manage_Users_Admin from './system/page/admin/manage_users/Manage_Users_Admin';
  import Brand_Admin from './system/page/admin/brand/Brand_Admin';

  // users
  //manager
  import Brand_Manager from './system/page/users/manager/brand/Brand_Manager';
  // //staff
  import Brand_Staff from './system/page/users/staff/brand/Brand_Staff';

  // web 
  import Home_Web from './web/page/Home_Web';

  function App() {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Logins />} />
          // Dashboard
          <Route path="/dashboard" element={<Layout_System />}>
            <Route path="/dashboard" element={<Dashboard />} />
            // admin
            <Route path="admin/settings/gender" element={<Gender_Admin />} />
            <Route path="admin/settings/role" element={<Role_Admin />} />
            <Route path="admin/settings/permission" element={<Permission_Admin />} />
            <Route path="admin/settings/role-permission" element={<Role_Permission_Admin />} />
            <Route path="admin/manage-users" element={<Manage_Users_Admin/>} />
            <Route path="admin/brand" element={<Brand_Admin />} />
            //manager
            <Route path="manager/brand" element={<Brand_Manager />} />
            //staff
            <Route path="staff/brand" element={<Brand_Staff />} />
          </Route>

          // web
          <Route path="/" element={<Home_Web />}>
            <Route path="" element={<Home_Web />} />
          </Route>
      </Routes>
    </Router>
    );
  }

  export default App;

