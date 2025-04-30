import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Sample data for the dashboard
  const stats = [
    { id: 1, title: 'Total Leads', value: '248', change: '+12%', icon: '👥', color: 'bg-blue-500' },
    { id: 2, title: 'Maintenance Requests', value: '32', change: '+5%', icon: '🔧', color: 'bg-amber-500' },
    { id: 3, title: 'Products', value: '156', change: '+8%', icon: '📦', color: 'bg-green-500' },
    { id: 4, title: 'Revenue', value: '$12,420', change: '+18%', icon: '💰', color: 'bg-purple-500' },
  ];

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-sm text-gray-500 font-medium">{stat.title}</h2>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} text-white p-3 rounded-lg`}>
                <span className="text-xl">{stat.icon}</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 text-sm font-medium">{stat.change}</span>
              <span className="text-gray-400 text-xs ml-2">vs last month</span>
            </div>
          </div>
        ))}
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
                  <span className={`text-xs px-2 py-1 rounded-full inline-block mt-1 
                    ${request.status === 'Completed' 
                      ? 'bg-green-100 text-green-600' 
                      : request.status === 'Pending' 
                        ? 'bg-amber-100 text-amber-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
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

    