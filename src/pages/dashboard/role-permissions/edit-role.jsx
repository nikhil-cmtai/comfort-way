import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/button';
import Card from '../../../components/ui/Card';
import FormInput from '../../../components/ui/FormInput';

const MODULES = [
  'Users',
  'Tasks',
  'Reports',
  'Settings',
];
const CRUD = ['Create', 'Read', 'Update', 'Delete'];

const mockRoles = [
  { id: 1, name: 'Admin', permissions: { Users: CRUD, Tasks: CRUD, Reports: CRUD, Settings: CRUD } },
  { id: 2, name: 'Manager', permissions: { Users: ['Read'], Tasks: CRUD, Reports: ['Read', 'Update'], Settings: [] } },
  { id: 3, name: 'User', permissions: { Users: ['Read'], Tasks: ['Read', 'Update'], Reports: [], Settings: [] } },
];

const EditRole = () => {
  const { id } = useParams();
  const router = useNavigate();
  const roleId = parseInt(id);

  const [role, setRole] = useState(null);
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Simulate fetching role by id
    const found = mockRoles.find(r => r.id === roleId) || mockRoles[0];
    setRole(found);
    setRoleName(found.name);
    setPermissions(found.permissions);
  }, [roleId]);

  const handleRoleNameChange = (e) => {
    setRoleName(e.target.value);
  };

  const handlePermissionChange = (module, action) => {
    setPermissions(prev => {
      const current = prev[module] || [];
      if (current.includes(action)) {
        return { ...prev, [module]: current.filter(a => a !== action) };
      } else {
        return { ...prev, [module]: [...current, action] };
      }
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      // Simulate save
      setIsSaving(false);
      router('/dashboard/roles-permissions');
    }, 800);
  };

  if (!role) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-8 tracking-tight">Edit Role</h1>
      <Card className="shadow-lg p-8">
        <form onSubmit={handleSave}>
          <div className="mb-8">
            <FormInput
              label="Role Name"
              id="role-name"
              name="roleName"
              value={roleName}
              onChange={handleRoleNameChange}
              required
              className="bg-white w-full max-w-md"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Module Permissions</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg mb-8">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">Module</th>
                    {CRUD.map(action => (
                      <th key={action} className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">{action}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {MODULES.map(module => (
                    <tr key={module}>
                      <td className="px-4 py-3 font-medium text-gray-800 border-b">{module}</td>
                      {CRUD.map(action => (
                        <td key={action} className="px-4 py-3 text-center border-b">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={permissions[module]?.includes(action) || false}
                              onChange={() => handlePermissionChange(module, action)}
                              className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                            />
                          </label>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="primary" type="submit" isLoading={isSaving} className="px-8 py-2 text-base">Save</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditRole;