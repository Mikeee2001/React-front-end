import Dashboard from '../../src/Component/admin/Dashboard';
import Profile from '../../src/Component/admin/Profile';
import UserList from '../Component/admin/UserList';


const routes = [ 

  { path: '/admin', exact: true, name: 'Admin'  },
  { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/admin/profile', exact: true, name: 'Profile', component: Profile },
  { path: '/admin/users', exact: true, name: 'User', component: UserList },


]

export default routes;

  
