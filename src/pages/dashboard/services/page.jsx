import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceData, selectServiceData, selectServiceLoading, selectServiceError, updateService, deleteService, addService } from '../../../features/slices/serviceSlice';
import { fetchRoleById, selectSelectedRole } from '../../../features/slices/roleSlice';

// Utility function to get permissions for a module
function getModulePermission(permissions, moduleName) {
    return permissions?.find(p => p.module === moduleName) || {};
} 

const Services = () => {
    const dispatch = useDispatch();
    const services = useSelector(selectServiceData);
    const loading = useSelector(selectServiceLoading);
    const error = useSelector(selectServiceError);
    const role = useSelector(selectSelectedRole);
    const roleId = localStorage.getItem('role');

    const [viewMode, setViewMode] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');

    // Modal states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [formData, setFormData] = useState({
        label: '',
        desc: '',
        img: null
    });
    const [imagePreview, setImagePreview] = useState(null);

    // Form handlers and modal functions
    const openAddModal = () => {
        setFormData({ label: '', desc: '', img: null });
        setImagePreview(null);
        setIsAddModalOpen(true);
    };

    const openEditModal = (service) => {
        setSelectedService(service);
        setFormData({
            label: service.label,
            desc: service.desc,
            img: null
        });
        setImagePreview(service.img);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (service) => {
        setSelectedService(service);
        setIsDeleteModalOpen(true);
    };

    const closeAllModals = () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
        setIsSubmitting(false);
        setSelectedService(null);
        setImagePreview(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                img: file
            });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const form = new FormData();
            form.append('label', formData.label);
            form.append('desc', formData.desc);
            if (formData.img) {
                form.append('img', formData.img);
            }
            if (isEditModalOpen && selectedService) {
                // For update, include id and updatedOn
                form.append('updatedOn', new Date().toISOString());
                await dispatch(updateService(selectedService.id, form));
            } else {
                // For add, include createdOn
                form.append('createdOn', new Date().toISOString());
                await dispatch(addService(form));
            }
            closeAllModals();
            dispatch(fetchServiceData());
        } catch (err) {
            // Optionally handle error
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        setIsSubmitting(true);
        try {
            await dispatch(deleteService(selectedService.id));
            closeAllModals();
            dispatch(fetchServiceData());
        } catch (err) {
            // Optionally handle error
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        dispatch(fetchServiceData());
    }, [dispatch]);


    useEffect(() => {
        dispatch(fetchRoleById(roleId));
    }, [dispatch, roleId]);

    // Use Redux services data for filtering
    const filteredServices = (services || []).filter(service =>
        (service.label || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (service.desc || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-3 text-gray-600">Loading services...</p>
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
    const servicePerm = getModulePermission(permissions, 'services');

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Services Management</h1>
                <p className="text-gray-500">Manage your services here</p>
            </div>
            {/* Action Bar */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Search services..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {/* View Toggle and Add Button */}
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex rounded-lg border border-gray-300 p-1">
                            <button
                                className={`p-1 rounded ${viewMode === 'grid' ? 'bg-white text-blue-600 border border-blue-200' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
                                onClick={() => setViewMode('grid')}
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </button>
                            <button
                                className={`p-1 rounded ${viewMode === 'list' ? 'bg-white text-blue-600 border border-blue-200' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
                                onClick={() => setViewMode('list')}
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                        {servicePerm.create && (
                        <button
                            className="bg-white hover:bg-gray-100 text-blue-700 py-2 px-4 rounded-lg transition-colors flex items-center gap-1 border border-blue-200"
                            onClick={openAddModal}
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Service
                        </button>
                        )}
                    </div>
                </div>
            </div>
            {/* Services Display */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredServices.map(service => (
                        <div key={service.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
                            <div className="relative">
                                <div className="w-full h-40 flex items-center justify-center">
                                    {service.img ? (
                                        <img
                                            src={service.img}
                                            alt={service.label}
                                            className="w-auto h-40 object-fit mx-auto"
                                        />
                                    ) : (
                                        <svg className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <div className="p-4 flex-grow flex flex-col">
                                <h3 className="font-semibold text-gray-800 mb-1">{service.label}</h3>
                                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{service.desc}</p>
                                <div className="flex gap-2 mt-auto">
                                    {servicePerm.update && (
                                    <button
                                        className="flex-1 text-blue-600 bg-blue-50 hover:bg-blue-100 py-2 rounded"
                                        onClick={() => openEditModal(service)}
                                    >
                                        Edit
                                    </button>
                                    )}
                                    {servicePerm.delete && (
                                    <button
                                        className="flex-1 text-red-600 bg-red-50 hover:bg-red-100 py-2 rounded"
                                        onClick={() => openDeleteModal(service)}
                                    >
                                        Delete
                                    </button>
                                    )}
                                </div>
                            
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Service
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Updated
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredServices.map(service => (
                                <tr key={service.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-md flex items-center justify-center">
                                                {service.img ? (
                                                    <img className="h-10 w-10 rounded-md object-cover" src={service.img} alt={service.label} />
                                                ) : (
                                                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{service.label}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 max-w-xs truncate">{service.desc}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {service.createdOn ? new Date(service.createdOn).toLocaleDateString() : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {service.updatedOn ? new Date(service.updatedOn).toLocaleDateString() : '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {servicePerm.update && (
                                        <button
                                            className="text-blue-600 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded mr-2"
                                            onClick={() => openEditModal(service)}
                                        >
                                            Edit
                                        </button>
                                        )}
                                        {servicePerm.delete && (
                                        <button
                                            className="text-red-600 bg-red-50 hover:bg-red-100 px-2 py-1 rounded"
                                            onClick={() => openDeleteModal(service)}
                                        >
                                            Delete
                                        </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {/* Empty State */}
            {filteredServices.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No services found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Try adjusting your search or create a new service.
                    </p>
                </div>
            )}
            {/* Add Service Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-gray-900">Add New Service</h3>
                                <button
                                    className="text-gray-600 hover:text-gray-800 bg-gray-100 p-1"
                                    onClick={closeAllModals}
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Service Label*
                                        </label>
                                        <input
                                            type="text"
                                            name="label"
                                            value={formData.label}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter service label"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            name="desc"
                                            value={formData.desc}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter service description"
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Service Image
                                        </label>
                                        <div className="mt-1 flex items-center">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                                id="service-image"
                                            />
                                            <label
                                                htmlFor="service-image"
                                                className="px-4 py-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 border border-gray-300 text-sm"
                                            >
                                                Choose Image
                                            </label>
                                            <span className="ml-3 text-sm text-gray-500">
                                                {formData.img ? formData.img.name : "No file chosen"}
                                            </span>
                                        </div>
                                        {imagePreview && (
                                            <div className="mt-3">
                                                <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
                                                <div className="relative w-full h-40 bg-gray-100 rounded-md overflow-hidden">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Service preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                                        onClick={() => {
                                                            setFormData({ ...formData, img: null });
                                                            setImagePreview(null);
                                                        }}
                                                    >
                                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeAllModals}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Creating...
                                            </>
                                        ) : (
                                            "Create Service"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {/* Edit Service Modal */}
            {isEditModalOpen && selectedService && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-gray-900">Edit Service</h3>
                                <button
                                    className="text-gray-600 hover:text-gray-800 bg-gray-100 p-1"
                                    onClick={closeAllModals}
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Service Label*
                                        </label>
                                        <input
                                            type="text"
                                            name="label"
                                            value={formData.label}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter service label"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            name="desc"
                                            value={formData.desc}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter service description"
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Service Image
                                        </label>
                                        <div className="mt-1 flex items-center">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                                id="edit-service-image"
                                            />
                                            <label
                                                htmlFor="edit-service-image"
                                                className="px-4 py-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 border border-gray-300 text-sm"
                                            >
                                                {imagePreview ? "Change Image" : "Choose Image"}
                                            </label>
                                            <span className="ml-3 text-sm text-gray-500">
                                                {formData.img ? formData.img.name : imagePreview ? "Current image" : "No file chosen"}
                                            </span>
                                        </div>
                                        {imagePreview && (
                                            <div className="mt-3">
                                                <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
                                                <div className="relative w-full h-40 bg-gray-100 rounded-md overflow-hidden">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Service preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                                        onClick={() => {
                                                            setFormData({ ...formData, img: null });
                                                            setImagePreview(null);
                                                        }}
                                                    >
                                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeAllModals}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Updating...
                                            </>
                                        ) : (
                                            "Update Service"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && selectedService && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg max-w-md w-full relative">
                        <div className="p-6">
                            <div className="flex items-center justify-center mb-4">
                                <div className="bg-red-100 rounded-full p-3">
                                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </div>
                            </div>
                            <div className="absolute top-4 right-4">
                                <button
                                    className="bg-white rounded-md p-2 text-gray-600 hover:bg-gray-100 border border-gray-200"
                                    onClick={closeAllModals}
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">Delete Service</h3>
                            <p className="text-gray-600 text-center mb-6">
                                Are you sure you want to delete <span className="font-semibold">"{selectedService.label}"</span> service? This action cannot be undone.
                            </p>
                            <div className="flex justify-center gap-3">
                                <button
                                    type="button"
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    onClick={closeAllModals}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 disabled:bg-red-300 disabled:cursor-not-allowed"
                                    onClick={handleDelete}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Deleting...
                                        </>
                                    ) : (
                                        "Delete Service"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Services; 