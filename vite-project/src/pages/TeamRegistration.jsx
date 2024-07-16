// src/pages/TeamRegistration.jsx
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { db, storage } from "../../firebaseConfig";

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
        <div className="container mx-auto mt-1">

            {isRegistered && registeredTeam ? (
                <div className="-mt-24">
                    <p className="text-green-500 mt-4 text-center font-semibold text-2xl">You have already registered a team.</p>
                    <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
                        <h3 className="text-3xl font-bold mb-4 text-center text-blue-600">{registeredTeam.teamName}</h3>
                        {registeredTeam.teamLogo && (
                            <div className="flex justify-center mb-4">
                                <img
                                    src={registeredTeam.teamLogo}
                                    alt="Team Logo"
                                    className="w-40 h-40 object-cover rounded-full shadow-lg"
                                />
                            </div>
                        )}
                        <h4 className="text-xl font-semibold mb-2 text-center text-gray-800">Team Members:</h4>
                        <ul className="text-lg mb-4 pl-6">
                            {registeredTeam.teamMembers.map((member, index) => (
                                <li key={index} className="mb-2">
                                    <span className="text-blue-600">{member}</span>
                                </li>
                            ))}
                        </ul>
                        {/* Additional Information (Commented Out) */}
                        {/* <p className="text-xl">Team Leader: {registeredTeam.leader}</p> */}
                        {/* <p className="text-lg text-gray-600 mt-2">Registered on: {registeredTeam.createdAt.toDate().toLocaleDateString()}</p> */}

                    </div>
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
