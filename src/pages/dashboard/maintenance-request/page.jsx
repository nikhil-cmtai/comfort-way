import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMaintenanceRequestData, selectMaintenanceRequestData, selectMaintenanceRequestLoading, selectMaintenanceRequestError } from '../../../features/slices/maintenanceSlice';
import { fetchRoleById, selectSelectedRole } from '../../../features/slices/roleSlice';

// Utility function to get permissions for a module
function getModulePermission(permissions, moduleName) {
    return permissions?.find(p => p.module === moduleName) || {};
} 

const MaintenanceRequest = () => {
  const dispatch = useDispatch();
  const maintenanceData = useSelector(selectMaintenanceRequestData) || {
    pending: [],
    inProgress: [],
    completed: [],
    cancelled: []
  };
  const role = useSelector(selectSelectedRole);
  const loading = useSelector(selectMaintenanceRequestLoading);
  const error = useSelector(selectMaintenanceRequestError);
  const [activeFilter, setActiveFilter] = useState('all');
  const roleId = localStorage.getItem('role');
  
  useEffect(() => {
    dispatch(fetchMaintenanceRequestData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRoleById(roleId));
  }, [dispatch, roleId]);

  const getPriorityBadgeClass = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter data based on active filter
  const filteredData = (() => {
    if (activeFilter === 'all') {
      return { ...maintenanceData };
    } else if (maintenanceData[activeFilter]) {
      return { [activeFilter]: maintenanceData[activeFilter] };
    } else {
      return {};
    }
  })();

  // Calculate counts safely
  const counts = {
    all: Object.values(maintenanceData).flat().length,
    pending: (maintenanceData.pending || []).length,
    inProgress: (maintenanceData.inProgress || []).length,
    completed: (maintenanceData.completed || []).length,
    cancelled: (maintenanceData.cancelled || []).length
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

  if (loading) {
    return <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-3 text-gray-600">Loading maintenance requests...</p>
      </div>
    </div>;
  }

  if (error) {
    return <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="text-center bg-red-100 rounded-xl p-6 max-w-md">
        <div className="mx-auto h-12 w-12 text-red-500 flex items-center justify-center text-3xl font-bold">!</div>
        <h2 className="mt-2 text-lg font-semibold text-red-800">Error</h2>
        <p className="mt-1 text-red-600">{error}</p>
      </div>
    </div>;
  }

  const permissions = role?.permissions || [];
  const maintenancePerm = getModulePermission(permissions, 'maintenance requests');

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
        {maintenancePerm.create && (
        <div className="ml-auto">
          <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-4 rounded-lg transition-colors flex items-center gap-1 border border-blue-200">
            + New Request
          </button>
        </div>
        )}
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
                {(requests && requests.length > 0) ? requests.map(request => (
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
                        {request.customer?.charAt(0) || '?'}
                      </div>
                      <div className="ml-2">
                        <div className="text-sm font-medium">{request.customer || 'Unknown'}</div>
                        <div className="text-xs text-gray-500">{request.phone || '-'}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 flex justify-between items-center pt-2 border-t">
                      <span>{request.date ? new Date(request.date).toLocaleDateString() : '-'}</span>
                      <div className="flex gap-2">
                        {maintenancePerm.update && (
                        <button className="text-blue-600 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded">Edit</button>
                        )}
                        {maintenancePerm.read && (
                        <button className="text-gray-600 bg-gray-50 hover:bg-gray-100 px-2 py-1 rounded">Details</button>
                        )}
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500">
                    <div className="h-12 w-12 mx-auto text-gray-300 mb-3 flex items-center justify-center text-3xl">—</div>
                    <p>No requests in this status</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceRequest;

