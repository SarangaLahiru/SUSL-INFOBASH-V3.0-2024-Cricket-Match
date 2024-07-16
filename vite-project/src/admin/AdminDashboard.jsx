import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from '../../firebaseConfig'; // Import your Firebase Firestore instance
// Adjust import path as per your project structure
import AddMatchForm from './AddMatches';
import MatchList from "./MatchList"; // Adjust import path as per your project structure

const AdminDashboard = () => {
    const navigate = useNavigate();

    // State for managing matches
    const [matches, setMatches] = useState([]);

    // Effect to fetch matches on component mount
    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const matchesSnapshot = await getDocs(collection(db, "matches"));
                const matchesData = matchesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setMatches(matchesData);
            } catch (error) {
                console.error("Error fetching matches:", error);
            }
        };

        fetchMatches();
    }, []); // Empty dependency array ensures this effect runs only once on mount

    // Redirect if adminId is not valid
    useEffect(() => {
        if (sessionStorage.getItem('adminId') !== 'CpueOxzYZ8Z1zucJI2Wt') {
            console.log("Unauthorized access detected. Redirecting to admin login page.");
            navigate('/admin');
        }
    }, [navigate]); // Include navigate in the dependency array to ensure it's up-to-date

    const [showAddMatchForm, setShowAddMatchForm] = useState(false);

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
            <button
                onClick={() => setShowAddMatchForm(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
                Add Match
            </button>
            {showAddMatchForm && <AddMatchForm />}
            <MatchList matches={matches} />
        </div>
    );
};

export default AdminDashboard;
