import React, { useState } from 'react';
import Button from '../../../components/ui/button';
import Modal from '../../../components/ui/Modal';
import FormInput from '../../../components/ui/FormInput';
import Card from '../../../components/ui/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTaskData, selectTaskData, selectTaskLoading, selectTaskError, deleteTask } from '../../../features/slices/taskSlice';

const USERS_TEAMS = [
  { value: 'john', label: 'John Smith' },
  { value: 'emily', label: 'Emily Johnson' },
  { value: 'tech', label: 'Tech Solutions Team' },
  { value: 'sarah', label: 'Sarah Wilson' },
  { value: 'green', label: 'Green Meadows Team' },
];

const STATUS_OPTIONS = [
  { value: 'todo', label: 'To Do' },
  { value: 'inprogress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignee: '',
    status: 'todo',
    dueDate: '',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open add modal
  const openAddModal = () => {
    setFormData({
      title: '',
      description: '',
      assignee: '',
      status: 'todo',
      dueDate: '',
    });
    setIsModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (task) => {
    setCurrentTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      assignee: task.assignee,
      status: task.status,
      dueDate: task.dueDate,
    });
    setIsEditModalOpen(true);
  };

  // Add task
  const handleAddTask = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setTasks([
        {
          id: Date.now(),
          ...formData,
        },
        ...tasks,
      ]);
      setIsSubmitting(false);
      setIsModalOpen(false);
    }, 500);
  };

  // Update task
  const handleUpdateTask = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setTasks(tasks.map((task) =>
        task.id === currentTask.id ? { ...task, ...formData } : task
      ));
      setIsSubmitting(false);
      setIsEditModalOpen(false);
    }, 500);
  };

  // Delete task
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Button variant="primary" onClick={openAddModal}>Create Task</Button>
      </div>
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                    No tasks found. Create your first task!
                  </td>
                </tr>
              )}
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{task.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {USERS_TEAMS.find(u => u.value === task.assignee)?.label || task.assignee}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">{STATUS_OPTIONS.find(s => s.value === task.status)?.label}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{task.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end items-center space-x-2">
                      <Button variant="primary" size="sm" onClick={() => openEditModal(task)}>Edit</Button>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteTask(task.id)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Task Modal */}
      <Modal.Form
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTask}
        title="Create Task"
        submitText="Create Task"
        isLoading={isSubmitting}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Title"
            id="add-title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="bg-white"
          />
          <FormInput
            label="Due Date"
            id="add-dueDate"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleInputChange}
            required
            className="bg-white"
          />
          <FormInput
            label="Description"
            id="add-description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="bg-white md:col-span-2"
          />
          <FormInput.Select
            label="Assignee"
            id="add-assignee"
            name="assignee"
            options={USERS_TEAMS}
            value={formData.assignee}
            onChange={handleInputChange}
            required
            className="bg-white"
          />
          <FormInput.Select
            label="Status"
            id="add-status"
            name="status"
            options={STATUS_OPTIONS}
            value={formData.status}
            onChange={handleInputChange}
            required
            className="bg-white"
          />
        </div>
      </Modal.Form>

      {/* Edit Task Modal */}
      <Modal.Form
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdateTask}
        title={`Edit Task: ${currentTask?.title}`}
        submitText="Update Task"
        isLoading={isSubmitting}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Title"
            id="edit-title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="bg-white"
          />
          <FormInput
            label="Due Date"
            id="edit-dueDate"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleInputChange}
            required
            className="bg-white"
          />
          <FormInput
            label="Description"
            id="edit-description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="bg-white md:col-span-2"
          />
          <FormInput.Select
            label="Assignee"
            id="edit-assignee"
            name="assignee"
            options={USERS_TEAMS}
            value={formData.assignee}
            onChange={handleInputChange}
            required
            className="bg-white"
          />
          <FormInput.Select
            label="Status"
            id="edit-status"
            name="status"
            options={STATUS_OPTIONS}
            value={formData.status}
            onChange={handleInputChange}
            required
            className="bg-white"
          />
        </div>
      </Modal.Form>
    </div>
  );
};

export default TasksPage;