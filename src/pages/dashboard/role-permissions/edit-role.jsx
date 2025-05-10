import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/button';
import Card from '../../../components/ui/Card';
import FormInput from '../../../components/ui/FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoleById, selectSelectedRole, selectRoleLoading, selectRoleError, editRole } from '../../../features/slices/roleSlice';

const CRUD_ACTIONS = ["create", "read", "update", "delete"];

const EditRole = () => {
  const { id } = useParams();
  const router = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector(selectSelectedRole);
  const isLoading = useSelector(selectRoleLoading);
  const error = useSelector(selectRoleError);

  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState([]); // array of objects
  const [isSaving, setIsSaving] = useState(false);

  // Convert API permissions (array of objects) to state
  useEffect(() => {
    if (role) {
      setRoleName(role.roleName || "");
      setPermissions(role.permissions ? JSON.parse(JSON.stringify(role.permissions)) : []);
    }
  }, [role]);

  useEffect(() => {
    dispatch(fetchRoleById(id));
  }, [dispatch, id]);

  const handleRoleNameChange = (e) => {
    setRoleName(e.target.value);
  };

  // Toggle a specific permission for a module
  const handlePermissionChange = (module, action) => {
    setPermissions(prev =>
      prev.map(perm =>
        perm.module === module
          ? { ...perm, [action]: !perm[action] }
          : perm
      )
    );
  };

  // Convert permissions array of objects to API format (same as state)
  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    dispatch(editRole(id, { roleName, permissions }));
    setTimeout(() => {
      setIsSaving(false);
      router("/dashboard/roles-permissions");
    }, 800);
  };

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6">Error: {error}</div>;
  if (!role) return <div className="p-6">Role not found</div>;

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
                    {CRUD_ACTIONS.map(action => (
                      <th key={action} className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">{action.charAt(0).toUpperCase() + action.slice(1)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {permissions.map(perm => (
                    <tr key={perm.module}>
                      <td className="px-4 py-3 font-medium text-gray-800 border-b">{
                        perm.module.charAt(0).toUpperCase() + perm.module.slice(1)
                      }</td>
                      {CRUD_ACTIONS.map(action => (
                        <td key={action} className="px-4 py-3 text-center border-b">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!!perm[action]}
                              onChange={() => handlePermissionChange(perm.module, action)}
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
            <Button variant="primary" type="submit" disabled={isSaving} className="px-8 py-2 text-base">
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditRole;