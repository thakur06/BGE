import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const IT_Admin = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    reportsto: '',
    reportshimher: '',
    role: '',
    dept: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    const userData = {
      ...formData,
      reportshimher: formData.reportshimher ? formData.reportshimher.split(',').map(id => id.trim()) : [],
      reportsto: formData.reportsto || null,
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please log in to create a user');
      }
      const response = await axios.post('http://localhost:3000/user/new-user', userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(response.data.message);
      setFormData({
        username: '',
        email: '',
        password: '',
        reportsto: '',
        reportshimher: '',
        role:'',
        dept: '',
      });
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New User</h2>
        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Reports To (User ID)</label>
            <input
              type="text"
              name="reportsto"
              value={formData.reportsto}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter user ID (optional)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Reports Him/Her (User IDs, comma-separated)</label>
            <input
              type="text"
              name="reportshimher"
              value={formData.reportshimher}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter user IDs (optional)"
            />
          </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder={`Enter role`}
            />
          </div>
         
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              name="dept"
              value={formData.dept}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter department"
            />
          </div>
          <button
            type="submit"
          >
            {loading ? 'Creating...' : 'Create User'}
          </button>
        </form>
      </div>
    </div>
  );
};