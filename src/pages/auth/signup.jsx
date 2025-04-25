import React, { useState } from 'react';
import { FiUserPlus, FiLogIn, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // Assuming you use React Router

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(''); // Clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // Replace with your actual signup logic (e.g., API call)
    console.log('Signup attempt:', { name: formData.name, email: formData.email });
    alert('Signup successful! Please sign in. (Placeholder)');
    // Redirect user or clear form
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-200 to-blue-300 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 sm:p-12 rounded-2xl shadow-2xl border border-gray-100">
        <div className="text-center">
          <div className="inline-block p-4 bg-blue-100 rounded-full mb-5">
            <FiUserPlus className="h-10 w-10 text-blue-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create Your Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join us! Or{' '}
            <Link to="/auth/signin" className="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out">
              sign in if you already have an account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Password (min. 6 characters)"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

         {error && (
             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg relative text-sm text-center" role="alert">
                {error}
             </div>
         )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup; 