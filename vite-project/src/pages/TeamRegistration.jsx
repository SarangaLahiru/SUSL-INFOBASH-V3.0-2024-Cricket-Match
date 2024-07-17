import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { db, storage } from "../../firebaseConfig";


const TeamRegistration = ({ user }) => {
    const [teamName, setTeamName] = useState("");
    const [teamLogo, setTeamLogo] = useState(null);
    const [teamMembers, setTeamMembers] = useState([]);
    const [error, setError] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);
    const [registeredTeam, setRegisteredTeam] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const checkRegistration = async () => {
            setLoading(true);
            try {
                const userDocRef = doc(db, "teams", user.uid);
                const docSnap = await getDoc(userDocRef);
                if (docSnap.exists()) {
                    setIsRegistered(true);
                    setRegisteredTeam(docSnap.data());
                } else {
                    setIsRegistered(false);
                    setRegisteredTeam(null);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error checking team registration:", error.message);
                setIsRegistered(false);
                setRegisteredTeam(null);
                setLoading(false);
            }
        };

        if (user) {
            checkRegistration();
        }
        if (!user) {
            window.location.replace('/');
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

    const handleAddMember = () => {
        if (teamMembers.length < 11) {
            setTeamMembers([...teamMembers, ""]);
        }
    };

    const handleRemoveMember = (index) => {
        const newMembers = teamMembers.filter((_, i) => i !== index);
        setTeamMembers(newMembers);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            if (!teamLogo) {
                throw new Error("Please upload a team logo.");
            }

            if (isRegistered) {
                throw new Error("You have already registered a team.");
            }
            if (teamMembers.length < 5) {

                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Error",
                    text: "Team member should minimum 5 members",
                    showConfirmButton: false,
                    timer: 3000,
                    customClass: {
                        popup: 'custom-swal'
                    }
                });
            }

            const logoURL = await uploadTeamLogo(user.uid, teamLogo);
            const userDocRef = doc(db, "teams", user.uid);
            await setDoc(userDocRef, {
                teamName,
                teamLogo: logoURL,
                teamMembers,
                leader: user.uid,
                createdAt: new Date()
            });
            setTeamName("");
            setTeamLogo(null);
            setTeamMembers(["", "", "", "", ""]);
            setError("");
            setIsRegistered(true);
            setRegisteredTeam({
                teamName,
                teamLogo: logoURL,
                teamMembers,
                leader: user.uid,
                createdAt: new Date()
            });

            setLoading(false);


            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your Team registered",
                showConfirmButton: false,
                timer: 3000,
                customClass: {
                    popup: 'custom-swal'
                }
            });
        } catch (error) {
            console.error("Error registering team:", error.message);
            setError(error.message);
            setLoading(false);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 3000,
                customClass: {
                    popup: 'custom-swal'
                }
            });
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
        <>
            {
                loading ? (
                    <div className="w-full mt-40">
                        <div className=" w-2 m-auto">
                            <Spinner color="warning" aria-label="Warning spinner example" size="lg" />
                        </div>
                    </div>

                ) : (
                    <div className="min-h-screen flex items-center justify-center bg-gray-700 py-20 px-4 sm:px-6 lg:px-8">
                        {isRegistered && registeredTeam ? (
                            <div className="bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 p-10 rounded-lg shadow-xl w-full max-w-lg">
                                <p className="text-green-400 text-2xl font-semibold text-center mb-6">You have already registered a team.</p>
                                <div>
                                    <h3 className="text-3xl font-bold text-yellow-500 mb-6 tracking-wide text-center">
                                        {registeredTeam.teamName}
                                    </h3>
                                    {registeredTeam.teamLogo && (
                                        <div className="flex justify-center mb-6">
                                            <img
                                                src={registeredTeam.teamLogo}
                                                alt="Team Logo"
                                                className="w-40 h-40 object-cover rounded-full shadow-2xl"
                                            />
                                        </div>
                                    )}
                                    <h4 className="text-2xl font-semibold text-gray-500 mb-4">
                                        Team Members:
                                    </h4>
                                    <ul className="text-lg text-gray-300 space-y-2">
                                        {registeredTeam.teamMembers.map((member, index) => (
                                            <li
                                                key={index}
                                                className="relative pl-2 bg-gray-700 p-2 rounded-lg"
                                            >
                                                {member}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-gray-800 p-16 rounded-lg shadow-xl w-full max-w-lg">
                                <h2 className="text-3xl font-bold text-center text-yellow-500 mb-6">Register Your Team</h2>
                                <input
                                    type="text"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                    placeholder="Team Name"
                                    className="bg-gray-100 px-4 py-3 rounded mb-4 w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <input
                                    type="file"
                                    accept="image/jpeg"
                                    onChange={handleImageChange}
                                    className="bg-gray-100 px-4 py-3 rounded mb-4 w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                {teamMembers.map((member, index) => (
                                    <div key={index} className="flex items-center mb-4">
                                        <input
                                            type="text"
                                            value={member}
                                            onChange={(e) => handleInputChange(index, e)}
                                            placeholder={`Member ${index + 1}`}
                                            className="bg-gray-100 px-4 py-3 rounded w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        {index >= 0 && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveMember(index)}
                                                className="ml-2 text-red-500 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {teamMembers.length < 11 && (
                                    <button
                                        type="button"
                                        onClick={handleAddMember}
                                        className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 rounded transition duration-300 mb-4"
                                    >
                                        Add Member
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="w-full bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-3 rounded transition duration-300"
                                >
                                    Register Team
                                </button>
                                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                            </form>
                        )}
                    </div>
                )}
        </>
    );
};





export default TeamRegistration;
