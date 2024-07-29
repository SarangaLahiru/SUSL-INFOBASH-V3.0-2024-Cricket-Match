// src/components/AddMatchForm.jsx
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebaseConfig";

const AddMatchForm = () => {
    const [team1Id, setTeam1Id] = useState("");
    const [team2Id, setTeam2Id] = useState("");
    const [score, setScore] = useState("");
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const matchesCollection = collection(db, "matches");
            await addDoc(matchesCollection, {
                team1Id,
                team2Id,
                score,
                status,
                createdAt: new Date()
            });
            setTeam1Id("");
            setTeam2Id("");
            setScore("");
            setStatus("");
            setError("");
            alert("Match added successfully");
        } catch (error) {
            console.error("Error adding match:", error.message);
            setError("Failed to add match. Please try again.");
        }
    };

    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Add Match</h3>
            <form onSubmit={handleSubmit} className="bg-[#000014] p-4 rounded shadow-md max-w-lg mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Team 1 ID</label>
                    <input
                        type="text"
                        value={team1Id}
                        onChange={(e) => setTeam1Id(e.target.value)}
                        className="bg-gray-100 text-black px-4 py-2 rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Team 2 ID</label>
                    <input
                        type="text"
                        value={team2Id}
                        onChange={(e) => setTeam2Id(e.target.value)}
                        className="bg-gray-100 text-black px-4 py-2 rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Score</label>
                    <input
                        type="text"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        className="bg-gray-100 text-black px-4 py-2 rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                    <input
                        type="text"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="bg-gray-100 text-black px-4 py-2 rounded w-full"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    Add Match
                </button>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </form>
        </div>
    );
};

export default AddMatchForm;
