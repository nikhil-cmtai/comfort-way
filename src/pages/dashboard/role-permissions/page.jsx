import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/button';
import Card from '../../../components/ui/Card';
import Modal from '../../../components/ui/Modal';

const mockRoles = [
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Manager' },
  { id: 3, name: 'User' },
];

const RolePermissionsPage = () => {
  const [roles, setRoles] = useState(mockRoles);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const router = useNavigate();

  const handleEdit = (id) => {
    router(`/dashboard/role-permissions/${id}`);
  };

  const openDeleteModal = (role) => {
    setRoleToDelete(role);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setRoles(roles.filter(role => role.id !== roleToDelete.id));
    setIsDeleteModalOpen(false);
    setRoleToDelete(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setRoleToDelete(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center mb-8 tracking-tight">Role Permissions</h1>
      <Card>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role Name</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {roles.map(role => (
              <tr key={role.id} className="hover:bg-blue-50 transition-colors">
                <td className="px-6 py-3 whitespace-nowrap text-base font-medium text-gray-800">{role.name}</td>
                <td className="px-6 py-3 whitespace-nowrap text-right">
                  <div className="flex justify-end items-center gap-2">
                    <Button variant="primary" size="sm" onClick={() => handleEdit(role.id)} className="!px-4">Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => openDeleteModal(role)} className="!px-4">Delete</Button>
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
        message={`Are you sure you want to delete the role '${roleToDelete?.name}'? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
};

export default RolePermissionsPage;