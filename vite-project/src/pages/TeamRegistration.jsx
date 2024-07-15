// src/pages/TeamRegistration.jsx
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { db, storage } from "../../firebase";

const TeamRegistration = ({ user }) => {
    const [teamName, setTeamName] = useState("");
    const [teamLogo, setTeamLogo] = useState(null);
    const [teamMembers, setTeamMembers] = useState(["", "", "", "", ""]);
    const [error, setError] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);
    const [registeredTeam, setRegisteredTeam] = useState(null); // State to store registered team details

    useEffect(() => {
        // Check if the user is already registered
        const checkRegistration = async () => {
            try {
                const userDocRef = doc(db, "teams", user.uid);
                const docSnap = await getDoc(userDocRef);
                if (docSnap.exists()) {
                    setIsRegistered(true);
                    setRegisteredTeam(docSnap.data()); // Store registered team details
                } else {
                    setIsRegistered(false);
                    setRegisteredTeam(null);
                }
            } catch (error) {
                console.error("Error checking team registration:", error.message);
                setIsRegistered(false);
                setRegisteredTeam(null);
            }
        };

        if (user) {
            checkRegistration();
        }
    }, [user]);

    const handleInputChange = (index, event) => {
        const newMembers = [...teamMembers];
        newMembers[index] = event.target.value;
        setTeamMembers(newMembers);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setTeamLogo(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!teamLogo) {
                throw new Error("Please upload a team logo.");
            }

            if (isRegistered) {
                throw new Error("You have already registered a team.");
            }

            const logoURL = await uploadTeamLogo(user.uid, teamLogo);
            const userDocRef = doc(db, "teams", user.uid);
            await setDoc(userDocRef, {
                teamName,
                teamLogo: logoURL,
                teamMembers,
                leader: user.uid,
                createdAt: new Date() // Add createdAt timestamp
            });
            setTeamName("");
            setTeamLogo(null);
            setTeamMembers(["", "", "", "", ""]);
            setError("");
            setIsRegistered(true); // Mark as registered after successful registration
            setRegisteredTeam({
                teamName,
                teamLogo: logoURL,
                teamMembers,
                leader: user.uid,
                createdAt: new Date() // Store createdAt timestamp
            }); // Store registered team details
        } catch (error) {
            console.error("Error registering team:", error.message);
            setError(error.message);
        }
    };

    const uploadTeamLogo = async (uid, teamLogoFile) => {
        try {
            const storageRef = ref(storage, `team-logos/${uid}/${teamLogoFile.name}`);
            await uploadBytes(storageRef, teamLogoFile);
            const logoURL = await getDownloadURL(storageRef);
            return logoURL;
        } catch (error) {
            console.error("Error uploading team logo:", error);
            throw error;
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Register Your Team</h2>
            {isRegistered && registeredTeam ? (
                <div className="bg-white p-8 rounded shadow-md max-w-lg mx-auto">
                    <h3 className="text-xl font-bold mb-4">{registeredTeam.teamName}</h3>
                    {registeredTeam.teamLogo && (
                        <img
                            src={registeredTeam.teamLogo}
                            alt="Team Logo"
                            className="w-32 h-32 object-cover rounded-full mb-4"
                        />
                    )}
                    <h4 className="text-lg font-semibold mb-2">Team Members:</h4>
                    <ul className="list-disc list-inside mb-4">
                        {registeredTeam.teamMembers.map((member, index) => (
                            <li key={index}>{member}</li>
                        ))}
                    </ul>
                    {/* <p>Team Leader: {registeredTeam.leader}</p> */}
                    {/* <p className="text-sm text-gray-600 mt-2">Registered on: {registeredTeam.createdAt.toDate().toLocaleDateString()}</p> */}
                    <p className="text-red-500 mt-4">You have already registered a team.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md max-w-lg mx-auto">
                    <input
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="Team Name"
                        className="bg-gray-100 px-4 py-2 rounded mb-4 w-full"
                        required
                    />
                    <input
                        type="file"
                        accept="image/jpeg"
                        onChange={handleImageChange}
                        className="bg-gray-100 px-4 py-2 rounded mb-4 w-full"
                        required
                    />
                    {teamMembers.map((member, index) => (
                        <input
                            key={index}
                            type="text"
                            value={member}
                            onChange={(e) => handleInputChange(index, e)}
                            placeholder={`Member ${index + 1}`}
                            className="bg-gray-100 px-4 py-2 rounded mb-4 w-full"
                            required
                        />
                    ))}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Register Team
                    </button>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </form>
            )}
        </div>
    );
};

export default TeamRegistration;
