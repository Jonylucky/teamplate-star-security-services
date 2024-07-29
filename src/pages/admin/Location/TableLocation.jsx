
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TableLocation = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editData, setEditData] = useState({});
    const [activeForm, setActiveForm] = useState(null); // Để xác định form nào đang hoạt động

    useEffect(() => {
        fetch('http://localhost:5000/api/ManagerDeparment/api/getMangeAll') // Thay bằng URL API lấy dữ liệu
            .then(response => response.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleEditClick = (item, formType) => {
        setActiveForm(formType);

        // Cập nhật editData dựa trên loại form
        switch (formType) {
            case 'department':
                setEditData({
                    id: item.department?.id || '',
                    name: item.department?.name || ''
                });
                break;
            case 'manager':
                setEditData({
                    id: item.manager?.id || '',
                    name: item.manager?.name || ''
                });
                break;
            case 'branch':
                setEditData({
                    id: item.branch?.id || '',
                    name: item.branch?.name || ''
                });
                break;
            case 'generalDepartment':
                setEditData({
                    id: item.generalDepartment?.id || '',
                    name: item.generalDepartment?.name || ''
                });
                break;
            default:
                setEditData({});
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveClick = async () => {
        if (editData && activeForm) {
            let endpoint = '';
            let dataToSend = {};

            switch (activeForm) {
                case 'department':
                    endpoint = 'http://localhost:5000/api/Department/update';
                    dataToSend = { id: editData.id, name: editData.name };
                    break;
                case 'manager':
                    endpoint = 'http://localhost:5000/api/Manage/update';
                    dataToSend = { id: editData.id, name: editData.name };
                    break;
                case 'branch':
                    endpoint = 'http://localhost:5000/api/Branch/update';
                    dataToSend = { id: editData.id, name: editData.name };
                    break;
                case 'generalDepartment':
                    endpoint = 'http://localhost:5000/api/GenaralDepartment/update';
                    dataToSend = { id: editData.id, name: editData.name };
                    break;
                default:
                    console.error('No form selected');
                    return;
            }

            try {
                const response = await axios.post(endpoint,
                    dataToSend
                );

                // Cập nhật dữ liệu sau khi thành công
                const updatedItem = response.data;

                const updatedData = data.map(item =>
                    item.id === updatedItem.id ? updatedItem : item
                );
                setData(updatedData);
                setEditData({});
                setActiveForm(null);
                console.log('Update successful');
            } catch (error) {
                console.error('Update failed:', error);
            }
        }
    };
    const handleCancelClick = () => {
        setEditData({});
        setActiveForm(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2>Data Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>Department ID</th>
                        <th>Department Name</th>
                        <th>Manager ID</th>
                        <th>Manager Name</th>
                        <th>Branch ID</th>
                        <th>Branch Name</th>
                        <th>General Department ID</th>
                        <th>General Department Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.department?.id}</td>
                            <td>{item.department?.name}</td>
                            <td>{item.manager?.id}</td>
                            <td>{item.manager?.name}</td>
                            <td>{item.branch?.id}</td>
                            <td>{item.branch?.name}</td>
                            <td>{item.generalDepartment?.id}</td>
                            <td>{item.generalDepartment?.name}</td>
                            <td>
                                <button onClick={() => handleEditClick(item, 'department')}>Edit Department</button>
                                <button onClick={() => handleEditClick(item, 'manager')}>Edit Manager</button>
                                <button onClick={() => handleEditClick(item, 'branch')}>Edit Branch</button>
                                <button onClick={() => handleEditClick(item, 'generalDepartment')}>Edit General Department</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {activeForm && (
                <div>
                    <h3>Edit Data</h3>
                    {activeForm === 'department' && (
                        <div>
                            <label>
                                Department Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={editData.name || ''}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Department ID:
                                <input
                                    type="text"
                                    name="id"
                                    value={editData.id || ''}
                                    disabled
                                />
                            </label>
                        </div>
                    )}
                    {activeForm === 'manager' && (
                        <div>
                            <label>
                                Manager Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={editData.name || ''}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Manager ID:
                                <input
                                    type="text"
                                    name="id"
                                    value={editData.id || ''}
                                    disabled
                                />
                            </label>
                        </div>
                    )}
                    {activeForm === 'branch' && (
                        <div>
                            <label>
                                Branch Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={editData.name || ''}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Branch ID:
                                <input
                                    type="text"
                                    name="id"
                                    value={editData.id || ''}
                                    disabled
                                />
                            </label>
                        </div>
                    )}
                    {activeForm === 'generalDepartment' && (
                        <div>
                            <label>
                                General Department Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={editData.name || ''}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                General Department ID:
                                <input
                                    type="text"
                                    name="id"
                                    value={editData.id || ''}
                                    disabled
                                />
                            </label>
                        </div>
                    )}
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default TableLocation;
