import Home from './containers/Home';

const routes = [
  {
    path: '/',
    name: 'Home',
    exact: true,
    isProtected: false,
    component: () => <p>This is the Home Component</p>
  },
  {
    path: '/landing',
    name: 'Landing',
    isProtected: false,
    component: () => <Landing />
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    isProtected: true,
    component: () => <Dashboard />
  },
  {
    path: '/market',
    name: 'Market',
    isProtected: true,
    component: () => <Market />
  },
  {
    path: '/member_registration',
    name: 'Member Registration',
    isProtected: true,
    component: () => <MemberRegistration />
  }
];

export default routes;