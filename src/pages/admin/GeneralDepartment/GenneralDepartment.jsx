import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Management = () => {
    const [generalDepartments, setGeneralDepartments] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [managers, setManagers] = useState([]);
    const [selectedGeneralDepartmentId, setSelectedGeneralDepartmentId] = useState(null);
    const [selectedManagerId, setSelectedManagerId] = useState(null);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
    const [newGeneralDepartmentName, setNewGeneralDepartmentName] = useState('');
    const [newManagerName, setNewManagerName] = useState('');
    const [newDepartmentName, setNewDepartmentName] = useState('');
    const [newBranchName, setNewBranchName] = useState('');

    useEffect(() => {
        const fetchGeneralDepartments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/GenaralDepartment/all');
                setGeneralDepartments(response.data.$values || []);
            } catch (error) {
                console.error('Error fetching general departments:', error);
            }
        };

        fetchGeneralDepartments();
    }, []);

    useEffect(() => {
        const fetchDepartments = async () => {
            if (selectedManagerId) {
                try {
                    const response = await axios.get('http://localhost:5000/api/Department/all');
                    setDepartments(response.data.$values || []);
                } catch (error) {
                    console.error('Error fetching departments:', error);
                }
            }
        };

        fetchDepartments();
    }, [selectedManagerId]);
    useEffect(() => {
        const fetchManagers = async () => {
            if (selectedGeneralDepartmentId) {
                try {
                    const response = await axios.get('http://localhost:5000/api/Manage/all');
                    setManagers(response.data.$values || []);
                } catch (error) {
                    console.error('Error fetching managers:', error);
                }
            }
        };

        fetchManagers();
    }, [selectedGeneralDepartmentId]);
    const handleAddGeneralDepartment = async () => {
        try {
            await axios.post('http://localhost:5000/api/GenaralDepartment/add', {
                name: newGeneralDepartmentName,
            });
            setNewGeneralDepartmentName('');
            // Refresh the general departments list
            fetchGeneralDepartments();
        } catch (error) {
            console.error('Error adding general department:', error);
        }
    };

    const handleAddManager = async () => {
        try {
            await axios.post('http://localhost:5000/api/Manage/add', {
                name: newManagerName,
            });
            setNewManagerName('');
            // Refresh the managers list

        } catch (error) {
            console.error('Error adding manager:', error);
        }
    };

    const handleAddDepartment = async () => {
        try {
            await axios.post('http://localhost:5000/api/Department/add', {
                name: newDepartmentName,
                generalDepartmentId: selectedGeneralDepartmentId,
                managerId: selectedManagerId,
            });
            setNewDepartmentName('');
            // Refresh the departments list

        } catch (error) {
            console.error('Error adding department:', error);
        }
    };

    const handleAddBranch = async () => {
        try {
            await axios.post('http://localhost:5000/api/Brach/add', {
                name: newBranchName,
                departnentId: selectedDepartmentId,
            });
            setNewBranchName('');
            // Refresh the branches list
        } catch (error) {
            console.error('Error adding branch:', error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Management</h2>

            {/* Add General Department */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Add General Department</h3>
                <input
                    type="text"
                    placeholder="General Department Name"
                    value={newGeneralDepartmentName}
                    onChange={(e) => setNewGeneralDepartmentName(e.target.value)}
                    className="px-3 py-2 border border-primary shadow-sm rounded-lg focus:outline-none block w-full sm:text-sm placeholder-slate-400"
                />
                <button
                    onClick={handleAddGeneralDepartment}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                    Add General Department
                </button>
            </div>

            {/* Select General Department */}
            {generalDepartments.length > 0 && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Select General Department</h3>
                    <select
                        onChange={(e) => setSelectedGeneralDepartmentId(e.target.value)}
                        className="px-3 py-2 border border-primary shadow-sm rounded-lg focus:outline-none block w-full sm:text-sm"
                    >
                        <option value="">Select a General Department</option>
                        {generalDepartments.map((department, index) => (
                            <option key={index} value={department.Id}>{department.Name}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* Add Manager */}
            {selectedGeneralDepartmentId && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Add Manager</h3>
                    <input
                        type="text"
                        placeholder="Manager Name"
                        value={newManagerName}
                        onChange={(e) => setNewManagerName(e.target.value)}
                        className="px-3 py-2 border border-primary shadow-sm rounded-lg focus:outline-none block w-full sm:text-sm placeholder-slate-400"
                    />
                    <button
                        onClick={handleAddManager}
                        className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
                    >
                        Add Manager
                    </button>
                </div>
            )}

            {/* Select Manager */}
            {selectedGeneralDepartmentId && managers.length > 0 && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Select Manager</h3>
                    <select
                        onChange={(e) => setSelectedManagerId(e.target.value)}
                        className="px-3 py-2 border border-primary shadow-sm rounded-lg focus:outline-none block w-full sm:text-sm"
                    >
                        <option value="">Select a Manager</option>
                        {managers.map((manager) => (
                            <option key={manager.id} value={manager.Id}>{manager.Name}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* Add Department */}
            {selectedManagerId && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Add Department</h3>
                    <input
                        type="text"
                        placeholder="Department Name"
                        value={newDepartmentName}
                        onChange={(e) => setNewDepartmentName(e.target.value)}
                        className="px-3 py-2 border border-primary shadow-sm rounded-lg focus:outline-none block w-full sm:text-sm placeholder-slate-400"
                    />
                    <button
                        onClick={handleAddDepartment}
                        className="mt-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none"
                    >
                        Add Department
                    </button>
                </div>
            )}

            {/* Select Department */}
            {selectedManagerId && departments.length > 0 && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Select Department</h3>
                    <select
                        onChange={(e) => setSelectedDepartmentId(e.target.value)}
                        className="px-3 py-2 border border-primary shadow-sm rounded-lg focus:outline-none block w-full sm:text-sm"
                    >
                        <option value="">Select a Department</option>
                        {departments.map((department) => (
                            <option key={department.id} value={department.Id}>{department.Name}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* Add Branch */}
            {selectedDepartmentId && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Add Branch</h3>
                    <input
                        type="text"
                        placeholder="Branch Name"
                        value={newBranchName}
                        onChange={(e) => setNewBranchName(e.target.value)}
                        className="px-3 py-2 border border-primary shadow-sm rounded-lg focus:outline-none block w-full sm:text-sm placeholder-slate-400"
                    />
                    <button
                        onClick={handleAddBranch}
                        className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none"
                    >
                        Add Branch
                    </button>
                </div>
            )}
        </div>
    );
};

export default Management;
