import React, { useState } from 'react';

const MaintenanceRequest = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // Sample maintenance requests data
  const maintenanceData = {
    pending: [
      { id: 1, customer: 'John Smith', service: 'AC Repair', priority: 'High', date: '2023-10-24', address: '123 Main St, Apt 4B, New York', phone: '(123) 456-7890', description: 'AC not cooling properly, making strange noises when turned on.' },
      { id: 2, customer: 'Emily Johnson', service: 'Refrigerator Service', priority: 'Medium', date: '2023-10-23', address: '456 Oak Ave, Chicago, IL', phone: '(234) 567-8901', description: 'Refrigerator not maintaining temperature and ice maker not working.' },
    ],
    inProgress: [
      { id: 3, customer: 'Michael Brown', service: 'Washing Machine', priority: 'Low', date: '2023-10-22', address: '789 Pine St, Miami, FL', phone: '(345) 678-9012', description: 'Washing machine leaking water during spin cycle.' },
      { id: 4, customer: 'Sarah Wilson', service: 'Dishwasher', priority: 'Medium', date: '2023-10-21', address: '321 Elm Rd, Seattle, WA', phone: '(456) 789-0123', description: 'Dishwasher not draining properly after cycle completes.' },
    ],
    completed: [
      { id: 5, customer: 'David Miller', service: 'Microwave Repair', priority: 'Low', date: '2023-10-20', address: '654 Maple Dr, Boston, MA', phone: '(567) 890-1234', description: 'Microwave turntable not rotating and interior light not working.' },
      { id: 6, customer: 'Jessica Davis', service: 'Oven Installation', priority: 'High', date: '2023-10-19', address: '987 Cedar Ln, Austin, TX', phone: '(678) 901-2345', description: 'Need new oven installed and old one removed.' },
    ],
    cancelled: [
      { id: 7, customer: 'Thomas Martinez', service: 'Water Heater', priority: 'High', date: '2023-10-18', address: '246 Birch Blvd, Denver, CO', phone: '(789) 012-3456', description: 'Water heater not providing hot water and making popping sounds.' },
    ]
  };

  const getPriorityBadgeClass = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter data based on active filter
  const filteredData = activeFilter === 'all' 
    ? { ...maintenanceData } 
    : { [activeFilter]: maintenanceData[activeFilter] };

  // Calculate counts
  const counts = {
    all: Object.values(maintenanceData).flat().length,
    pending: maintenanceData.pending.length,
    inProgress: maintenanceData.inProgress.length,
    completed: maintenanceData.completed.length,
    cancelled: maintenanceData.cancelled.length
  };

  // Get column title
  const getColumnTitle = (key) => {
    switch(key) {
      case 'pending': return 'Pending';
      case 'inProgress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return key;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Maintenance Requests</h1>
        <p className="text-gray-500">Track and manage customer service requests</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            activeFilter === 'all' 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setActiveFilter('all')}
        >
          <span>All</span>
          <span className="bg-white bg-opacity-90 text-xs px-2 py-1 rounded-full">{counts.all}</span>
        </button>

        <button 
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            activeFilter === 'pending' 
              ? 'bg-amber-100 text-amber-700' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setActiveFilter('pending')}
        >
          <span>Pending</span>
          <span className="bg-white bg-opacity-90 text-xs px-2 py-1 rounded-full">{counts.pending}</span>
        </button>

        <button 
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            activeFilter === 'inProgress' 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setActiveFilter('inProgress')}
        >
          <span>In Progress</span>
          <span className="bg-white bg-opacity-90 text-xs px-2 py-1 rounded-full">{counts.inProgress}</span>
        </button>

        <button 
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            activeFilter === 'completed' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setActiveFilter('completed')}
        >
          <span>Completed</span>
          <span className="bg-white bg-opacity-90 text-xs px-2 py-1 rounded-full">{counts.completed}</span>
        </button>

        <button 
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            activeFilter === 'cancelled' 
              ? 'bg-gray-300 text-gray-700' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setActiveFilter('cancelled')}
        >
          <span>Cancelled</span>
          <span className="bg-white bg-opacity-90 text-xs px-2 py-1 rounded-full">{counts.cancelled}</span>
        </button>

        <div className="ml-auto">
          <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-4 rounded-lg transition-colors flex items-center gap-1 border border-blue-200">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Request
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {Object.entries(filteredData).map(([status, requests]) => (
          <div key={status} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className={`p-4 ${
              status === 'pending' ? 'bg-amber-50 border-b border-amber-100' : 
              status === 'inProgress' ? 'bg-blue-50 border-b border-blue-100' : 
              status === 'completed' ? 'bg-green-50 border-b border-green-100' : 
              'bg-gray-50 border-b border-gray-100'
            }`}>
              <h2 className="font-bold text-gray-800 flex items-center justify-between">
                {getColumnTitle(status)}
                <span className="bg-white text-xs px-2 py-1 rounded-full shadow-sm">{requests.length}</span>
              </h2>
            </div>
            
            <div className="p-3 max-h-[calc(100vh-260px)] overflow-y-auto">
              <div className="space-y-3">
                {requests.map(request => (
                  <div key={request.id} className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-800">{request.service}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadgeClass(request.priority)}`}>
                        {request.priority}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{request.description}</p>
                    
                    <div className="flex items-center mb-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm">
                        {request.customer.charAt(0)}
                      </div>
                      <div className="ml-2">
                        <div className="text-sm font-medium">{request.customer}</div>
                        <div className="text-xs text-gray-500">{request.phone}</div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 flex justify-between items-center pt-2 border-t">
                      <span>{new Date(request.date).toLocaleDateString()}</span>
                      <div className="flex gap-2">
                        <button className="text-blue-600 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded">Edit</button>
                        <button className="text-gray-600 bg-gray-50 hover:bg-gray-100 px-2 py-1 rounded">Details</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {requests.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <svg className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p>No requests in this status</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceRequest;

