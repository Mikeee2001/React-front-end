import Dashboard from "../../src/Component/doctor/Dashboard";

const doctorRoutes = [
    { path: '/doctor', exact: true, name: 'Doctor' },
    { path: '/doctor/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    // Add more routes as needed
];

export default doctorRoutes;
