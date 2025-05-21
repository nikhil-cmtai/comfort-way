import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceHistoryData, selectServiceHistoryData, selectServiceHistoryLoading, selectServiceHistoryError } from '../../../features/slices/serviceHistorySlice';
import { fetchRoleById, selectSelectedRole } from '../../../features/slices/roleSlice';

// Utility function to get permissions for a module
function getModulePermission(permissions, moduleName) {
    return permissions?.find(p => p.module === moduleName) || {};
} 

const ServiceHistory = () => {
    const dispatch = useDispatch();
    const serviceHistory = useSelector(selectServiceHistoryData);
    const loading = useSelector(selectServiceHistoryLoading);
    const error = useSelector(selectServiceHistoryError);
    const role = useSelector(selectSelectedRole);
    const roleId = localStorage.getItem('role');

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchServiceHistoryData());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchRoleById(roleId));
    }, [dispatch, roleId]);

    // Filter by user name/email or service label
    const filteredHistory = (serviceHistory || []).filter(record =>
        (record.userName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (record.userEmail || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (record.serviceLabel || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-3 text-gray-600">Loading service history...</p>
            </div>
        </div>;
    }

    if (error) {
        return <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="text-center bg-red-100 rounded-xl p-6 max-w-md">
                <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="mt-2 text-lg font-semibold text-red-800">Error</h2>
                <p className="mt-1 text-red-600">{error}</p>
            </div>
        </div>;
    }

    const permissions = role?.permissions || [];
    const serviceHistoryPerm = getModulePermission(permissions, 'service History');

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Service Usage History</h1>
                <p className="text-gray-500">See which users have used which services and when.</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Search by user or service..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Used On</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredHistory.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-8 text-gray-400">No service history found.</td>
                            </tr>
                        ) : (
                            filteredHistory.map((record, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.userName || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.userEmail || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.serviceLabel || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.usedOn ? new Date(record.usedOn).toLocaleString() : '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${record.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{record.status || '-'}</span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServiceHistory;  