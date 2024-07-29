import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableLocation from '../Location/TableLocation';

const ListManager = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/ManagerDeparment/api/getMangeAll');
                console.log('API Response:', response.data);

                // Assuming response.data is the array of data you need
                setData(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    console.log(data)
    const handleUpdate = async (type, id, updatedData) => {
        try {
            let url = '';
            switch (type) {
                case 'Branch':
                    url = `http://localhost:5000/api/Branch/update/${id}`;
                    break;
                case 'Department':
                    url = `http://localhost:5000/api/Department/update/${id}`;
                    break;
                case 'Manager':
                    url = `http://localhost:5000/api/Manager/update/${id}`;
                    break;
                case 'GeneralDepartment':
                    url = `http://localhost:5000/api/GeneralDepartment/update/${id}`;
                    break;
                default:
                    throw new Error('Unknown type');
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });

            if (response.ok) {
                // Cập nhật dữ liệu thành công
                alert('Update successful');
                // Cập nhật lại dữ liệu trong state nếu cần
            } else {
                alert('Update failed');
            }
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };


    const columns = ['branch.name', 'department.name', 'department.generalDepartment.name', 'manager.name'];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <TableLocation data={data} columns={columns} />
        </div>
    );
};

export default ListManager;
