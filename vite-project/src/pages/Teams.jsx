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
        <div>

            <div className="container mx-auto mt-8">
                <h2 className="text-2xl font-bold mb-4">Registered Teams</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {teams.map((team) => (
                        <div key={team.id} className="bg-white p-4 rounded-lg shadow-md">
                            <img
                                src={team.teamLogo}
                                alt={`${team.teamName} Logo`}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2">{team.teamName}</h3>
                            <p className="text-gray-600 mb-4">{team.teamMembers.join(", ")}</p>
                            {/* <p className="text-gray-500 text-sm">Registered on: {team.createdAt.toDate().toLocaleDateString()}</p> */}
                        </div>
                    ))}
                </div>
            </div>


        </div>
    )
}
