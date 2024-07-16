import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";

const MatchList = () => {
    const [matches, setMatches] = useState([]);
    const [teams, setTeams] = useState({});

    useEffect(() => {
        fetchMatchesAndTeams();
    }, []);

    const fetchMatchesAndTeams = async () => {
        try {
            // Fetch matches
            const matchesSnapshot = await getDocs(collection(db, "matches"));
            const matchesData = matchesSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            // Fetch teams
            const teamsSnapshot = await getDocs(collection(db, "teams"));
            const teamsData = teamsSnapshot.docs.reduce((acc, doc) => {
                acc[doc.id] = { id: doc.id, ...doc.data() };
                return acc;
            }, {});

            setMatches(matchesData);
            setTeams(teamsData);
        } catch (error) {
            console.error("Error fetching matches and teams:", error);
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h3 className="text-lg font-semibold mb-4">Matches</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {matches.map((match) => {
                    const team1 = teams[match.team1Id] || {};
                    const team2 = teams[match.team2Id] || {};
                    return (
                        <div key={match.id} className="bg-white p-4 rounded shadow-md">
                            <div className="flex justify-between mb-2">
                                <span className="font-semibold">{team1.teamName || "Unknown Team"}</span>
                                <span className="font-semibold">{team2.teamName || "Unknown Team"}</span>
                            </div>
                            <div className="mb-2">
                                <span className="font-bold">Score:</span> {match.score}
                            </div>
                            <div className="mb-2">
                                <span className="font-bold">Status:</span> {match.status}
                            </div>
                            <div>
                                <span className="font-bold">Match ID:</span> {match.id}
                            </div>
                        </div>
                    );
                })}
            </div>

            <h3 className="text-lg font-semibold mt-8 mb-4">Teams</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.values(teams).map((team) => (
                    <div key={team.id} className="bg-white p-4 rounded shadow-md">
                        {team.teamLogo && (
                            <img src={team.teamLogo} alt={team.teamName} className="w-12 h-12 rounded-full mb-2" />
                        )}
                        <div className="mb-2">
                            <span className="font-semibold">{team.teamName}</span>
                        </div>
                        <div className="mb-2">
                            <span className="font-bold">Team ID:</span> {team.id}
                        </div>
                        <div className="mb-2">
                            <span className="font-bold">Team Members:</span>
                            <ul className="list-disc list-inside">
                                {team.teamMembers && team.teamMembers.map((member, index) => (
                                    <li key={index}>{member}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MatchList;