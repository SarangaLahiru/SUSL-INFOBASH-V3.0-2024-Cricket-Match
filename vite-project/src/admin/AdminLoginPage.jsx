// src/pages/AdminLoginPage.js
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebaseConfig'; // Import your Firebase Firestore instance

const AdminLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('adminId') === 'CpueOxzYZ8Z1zucJI2Wt') {
            console.log("sdfsdf")

            navigate('/adminDashboard');

        }
    })

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const adminsSnapshot = await getDocs(collection(db, "admin"));
            const admins = adminsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            const admin = admins.find(admin => admin.email === email && admin.password === password);

            if (admin) {
                // You might want to use a more secure method for storing authentication state
                sessionStorage.setItem('adminId', admin.id);
                navigate('/adminDashboard');
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            console.error("Error fetching admin credentials:", error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-100 px-4 py-2 rounded w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-100 px-4 py-2 rounded w-full"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Login
                    </button>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;
