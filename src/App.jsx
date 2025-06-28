import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Logins from './auth/Logins';
// admin 
import Layouts from './components/Layouts'; 
import Dashboards from './page/Dashboard/Dashboard';
import Genders from './page/Setting/Gender/Genders';
import Roles from './page/Setting/Roles/Roles';
import Permissions from './page/Setting/Permission/Permissions';
import Roles_Permissions from './page/Setting/Roles_Permission/Roles_Permissions';
import Manage_Users from './page/Manage_Users/Manage_Users';
import Brands from './page/Brand/Brands';
// users


// web 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Logins />} />
        // Dashboard
        <Route path="/" element={<Layouts />}>
          <Route path="dashboard" element={<Dashboards />} />
          <Route path="dashboard/dashboard" element={<Dashboards />} />
          <Route path="settings/genders" element={<Genders />} />
          <Route path="settings/roles" element={<Roles />} />
          <Route path="settings/permissions" element={<Permissions />} />
          <Route path="settings/roles-permissions" element={<Roles_Permissions />} />
          <Route path="manage-users" element={<Manage_Users />} />
          <Route path="brands" element={<Brands />} />
        </Route>
        // web
        {/* <Route path="/" element={<Layouts />}>
          <Route path="web" element={<Web />} />
        </Route> */}
    </Routes>
  </Router>
  );
}

export default App;

