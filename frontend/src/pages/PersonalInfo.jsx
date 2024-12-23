import React, { useEffect, useState } from 'react';

function PersonalInfo() {
    const [admin, setAdmin] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAdminInfo = async () => {
            try {
                const username = localStorage.getItem('username');
                console.log('Fetching admin info for username:', username);

                if (!username) {
                    setError('Username not found. Please log in again.');
                    return;
                }

                const response = await fetch(`/api/admin-info?username=${username}`);

                console.log(response);
                const data = await response.json();
                console.log(data)

                setAdmin(data.admin)
            } catch (error) {
                console.error('Error fetching admin info:', error);
                setError('An error occurred while fetching admin info.');
            }
        };

        fetchAdminInfo();
    }, []);

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!admin || admin[0] === null || admin[1] === null) {
        return <p>Loading or invalid data...</p>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
                    Thông tin cá nhân
                </h1>
                <div className="space-y-4">
                    <p className="text-lg">
                        <strong>Họ và tên:</strong> {admin[0]}
                    </p>
                    <p className="text-lg">
                        <strong>Email:</strong> {admin[1]}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PersonalInfo;
