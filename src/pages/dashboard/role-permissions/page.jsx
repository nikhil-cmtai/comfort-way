import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/button';
import Card from '../../../components/ui/Card';
import Modal from '../../../components/ui/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoleData, selectRoleData, selectRoleLoading, selectRoleError, deleteRole, addRole } from '../../../features/slices/roleSlice';

const NON_DELETE_ROLES = ['GzF9rIH8XyGFM1KPQvMO', 'jSCvJJxbUbsWLHqjN84l', 'pCEYHrDJ0f8nUBlNj5rJ', 'NpkR5K3M242WKHPdVTTw'];

const DEFAULT_PERMISSIONS = [
  { module: "users", create: false, read: false, update: false, delete: false },
  { module: "customers", create: false, read: false, update: false, delete: false },
  { module: "maintenance requests", create: false, read: false, update: false, delete: false },
  { module: "protection plans", create: false, read: false, update: false, delete: false },
  { module: "leads", create: false, read: false, update: false, delete: false },
  { module: "tasks", create: false, read: false, update: false, delete: false },
  { module: "product categories", create: false, read: false, update: false, delete: false },
  { module: "product list", create: false, read: false, update: false, delete: false },
  { module: "roles", create: false, read: false, update: false, delete: false },
  { module: "services", create: false, read: false, update: false, delete: false },
  { module: "service history", create: false, read: false, update: false, delete: false }
];

const RolePermissionsPage = () => {
  const dispatch = useDispatch();
  const roles = useSelector(selectRoleData);
  const isLoading = useSelector(selectRoleLoading);
  const error = useSelector(selectRoleError);

  useEffect(() => {
    dispatch(fetchRoleData());
  }, [dispatch]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [isNewRoleModalOpen, setIsNewRoleModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useNavigate();

  const handleEdit = (id) => {
    router(`/dashboard/roles-permissions/${id}`);
  };

  const openDeleteModal = (role) => {
    setRoleToDelete(role);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setIsDeleting(true);
    dispatch(deleteRole(roleToDelete.id))
      .then(() => {
        setIsDeleting(false);
        setIsDeleteModalOpen(false);
        setRoleToDelete(null);
        dispatch(fetchRoleData());
      });
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setRoleToDelete(null);
  };

  const handleOpenNewRoleModal = () => {
    setNewRoleName("");
    setIsNewRoleModalOpen(true);
  };

  const handleCloseNewRoleModal = () => {
    setIsNewRoleModalOpen(false);
    setNewRoleName("");
  };

  const handleCreateRole = (e) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;
    setIsCreating(true);
    // By default, permissions as per DEFAULT_PERMISSIONS
    dispatch(addRole({ roleName: newRoleName.trim(), permissions: DEFAULT_PERMISSIONS }))
      .then(() => {
        setIsCreating(false);
        setIsNewRoleModalOpen(false);
        setNewRoleName("");
        dispatch(fetchRoleData());
      });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Role Permissions</h1>
        <Button variant="primary" onClick={handleOpenNewRoleModal}>New Role</Button>
      </div>
      <Card>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role Name</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {isLoading && (
              <tr>
                <td colSpan="2" className="px-6 py-10 text-center text-gray-500">Loading...</td>
              </tr>
            )}  
            {error && (
              <tr>
                <td colSpan="2" className="px-6 py-10 text-center text-red-500">Error: {error}</td>
              </tr>
            )}
            {roles.map(role => (
              <tr key={role.id} className="hover:bg-blue-50 transition-colors">
                <td className="px-6 py-3 whitespace-nowrap text-base font-medium text-gray-800">{role.roleName}</td>
                <td className="px-6 py-3 whitespace-nowrap text-right">
                  <div className="flex justify-end items-center gap-2">
                    <Button variant="primary" size="sm" onClick={() => handleEdit(role.id)} className="!px-4">Edit</Button>
                    {!NON_DELETE_ROLES.includes(role.id) && (
                      <Button variant="danger" size="sm" onClick={() => openDeleteModal(role)} className="!px-4">Delete</Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {roles.length === 0 && (
              <tr>
                <td colSpan="2" className="px-6 py-10 text-center text-gray-500">No roles found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
      {/* Delete Confirmation Modal */}
      <Modal.Confirm
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Role"
        message={`Are you sure you want to delete the role '${roleToDelete?.roleName}'? This action cannot be undone.`}
        confirmText={isDeleting ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            Deleting...
          </span>
        ) : 'Delete'}
        cancelText="Cancel"
        variant="danger"
        disabled={isDeleting}
      />
      {/* New Role Modal */}
      <Modal isOpen={isNewRoleModalOpen} onClose={handleCloseNewRoleModal} title="Create New Role">
        <form onSubmit={handleCreateRole} className="p-6">
          <div className="mb-4">
            <label htmlFor="new-role-name" className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
            <input
              id="new-role-name"
              type="text"
              value={newRoleName}
              onChange={e => setNewRoleName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              required
              autoFocus
            />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="secondary" onClick={handleCloseNewRoleModal}>Cancel</Button>
            <Button type="submit" variant="primary" disabled={isCreating}>
              {isCreating ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                'Create'
              )}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default RolePermissionsPage;