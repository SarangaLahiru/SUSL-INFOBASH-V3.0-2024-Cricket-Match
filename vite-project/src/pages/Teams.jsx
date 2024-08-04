import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';

export default function Teams() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const teamsCollection = collection(db, "teams");
                const snapshot = await getDocs(teamsCollection);
                const teamsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTeams(teamsData);
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };

        fetchTeams();
    }, []);

    return (
        <div className="teams py-8">
            <div className="container mx-auto">
                <h2 className="text-4xl font-bold mb-8 text-center">Registered Teams</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-3 gap-6">
                    {teams.map((team) => (
                        <div
                            key={team.id}
                            className="p-4 rounded-lg shadow-md"
                            style={{
                                backgroundColor: 'rgba(0, 0, 20, 0.6)', // Transparent background color
                                border: '6px solid gold', // Gold border style
                                borderRadius: '0.6rem' // Rounded corners
                            }}
                        >
                            <h2 className="text-2xl sm:text-3xl text-center font-semibold mb-2">{team.teamName}</h2>
                            <img
                                src={team.teamLogo}
                                alt={`${team.teamName} Logo`}
                                className="w-full h-48  sm:h-64 object-cover rounded-2xl mb-4"
                            />
                            <div className="text-gray-600 mb-4 text-white">
                                <h3 className="font-semibold text-lg sm:text-xl">Players</h3>
                                <ul className="list-disc pl-5 list-none">
                                    {team.teamMembers.map((member, index) => (
                                        <li
                                            key={index}
                                            className="mb-2 mt-2 rounded-lg p-2"
                                            style={{
                                                backgroundColor: 'rgba(0, 0, 20, 0.8)', // Slightly transparent background color
                                               
                                            }}
                                        >
                                            {member}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* <p className="text-gray-500 text-sm">Registered on: {team.createdAt.toDate().toLocaleDateString()}</p> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
