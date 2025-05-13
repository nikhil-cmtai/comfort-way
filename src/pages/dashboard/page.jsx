import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStats, selectStats} from '../../features/slices/statSlice';
import { FiUsers, FiList, FiBox, FiShield, FiShoppingCart, FiUserCheck, FiRepeat, FiTool, FiClipboard } from 'react-icons/fi';

const statMeta = {
  categories:      { label: 'Categories',      icon: <FiList />,         color: 'bg-blue-100 text-blue-600' },
  maintenances:    { label: 'Maintenances',    icon: <FiTool />,         color: 'bg-green-100 text-green-600' },
  products:        { label: 'Products',        icon: <FiBox />,          color: 'bg-purple-100 text-purple-600' },
  protectionPlans: { label: 'Protection Plans',icon: <FiShield />,       color: 'bg-yellow-100 text-yellow-600' },
  purchasedPlans:  { label: 'Purchased Plans', icon: <FiShoppingCart />, color: 'bg-pink-100 text-pink-600' },
  roles:           { label: 'Roles',           icon: <FiUserCheck />,    color: 'bg-indigo-100 text-indigo-600' },
  serviceHistory:  { label: 'Service History', icon: <FiRepeat />,       color: 'bg-orange-100 text-orange-600' },
  services:        { label: 'Services',        icon: <FiClipboard />,    color: 'bg-teal-100 text-teal-600' },
  tasks:           { label: 'Tasks',           icon: <FiClipboard />,    color: 'bg-red-100 text-red-600' },
  users:           { label: 'Users',           icon: <FiUsers />,        color: 'bg-gray-100 text-gray-600' },
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const stats = useSelector(selectStats);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  const recentRequests = [
    { id: 1, name: 'John Smith', service: 'AC Repair', date: '24 Oct', status: 'Pending' },
    { id: 2, name: 'Emily Johnson', service: 'Refrigerator Service', date: '22 Oct', status: 'Completed' },
    { id: 3, name: 'Michael Davis', service: 'Washing Machine', date: '20 Oct', status: 'In Progress' },
    { id: 4, name: 'Sarah Wilson', service: 'Dishwasher Installation', date: '18 Oct', status: 'Completed' },
  ];
  

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back, Admin User! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats && Object.entries(stats)
          .filter(([key]) => key !== 'roles' && key !== 'tasks')
          .map(([key, value]) => {
            const meta = statMeta[key] || { label: key.charAt(0).toUpperCase() + key.slice(1), icon: <FiBox />, color: 'bg-blue-100 text-blue-600' };
            return (
              <div
                key={key}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h2 className="text-md font-semibold text-gray-600">{meta.label}</h2>
                    <p className="text-3xl font-extrabold text-gray-900 mt-2">{value}</p>
                  </div>
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${meta.color} text-2xl`}>
                    {meta.icon}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-gray-800">Performance Analytics</h2>
            <select className="text-sm border rounded p-1 bg-gray-50">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>
          
          {/* Placeholder for Chart - In a real app, you'd use a chart library */}
          <div className="h-64 w-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg overflow-hidden relative">
            <div className="absolute bottom-0 w-full">
              <div className="flex justify-between h-40">
                {/* Performance Graph Placeholder */}
                <div className="w-8 bg-blue-500 rounded-t-md mx-2 h-24 self-end"></div>
                <div className="w-8 bg-blue-500 rounded-t-md mx-2 h-16 self-end"></div>
                <div className="w-8 bg-blue-500 rounded-t-md mx-2 h-32 self-end"></div>
                <div className="w-8 bg-blue-500 rounded-t-md mx-2 h-28 self-end"></div>
                <div className="w-8 bg-blue-500 rounded-t-md mx-2 h-20 self-end"></div>
                <div className="w-8 bg-blue-500 rounded-t-md mx-2 h-36 self-end"></div>
                <div className="w-8 bg-blue-500 rounded-t-md mx-2 h-24 self-end"></div>
              </div>
            </div>
            <div className="absolute bottom-0 w-full border-t border-blue-100 pb-2 pt-2 px-4 bg-white bg-opacity-80">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Maintenance Requests */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-gray-800">Recent Requests</h2>
            <Link to="/dashboard/maintenance" className="text-blue-600 text-sm hover:underline">View All</Link>
          </div>
          
          <div className="space-y-4">
            {recentRequests.map((request) => (
              <div key={request.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-500 font-medium">
                  {request.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{request.name}</p>
                  <p className="text-xs text-gray-500">{request.service}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{request.date}</p>
                  <span className={
                    `text-xs px-2 py-1 rounded-full inline-block mt-1 
                    ${request.status === 'Completed' 
                      ? 'bg-green-100 text-green-600' 
                      : request.status === 'Pending' 
                        ? 'bg-amber-100 text-amber-600'
                        : 'bg-blue-100 text-blue-600'
                    }`
                  }>
                    {request.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;