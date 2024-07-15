// src/components/MatchCard.jsx
import React from "react";

const MatchCard = ({ match, teams }) => {
    const team1 = teams[match.team1Id];
    const team2 = teams[match.team2Id];

    return (
        <div className="bg-white p-4 rounded shadow-md">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    {team1 && team1.teamLogo && (
                        <img src={team1.teamLogo} alt={team1.teamName} className="w-12 h-12 rounded-full mr-2" />
                    )}
                    <span className="font-semibold">{team1 ? team1.teamName : "Unknown Team"}</span>
                </div>
                <div className="font-semibold">{match.score}</div>
                <div className="flex items-center">
                    <span className="font-semibold">{team2 ? team2.teamName : "Unknown Team"}</span>
                    {team2 && team2.teamLogo && (
                        <img src={team2.teamLogo} alt={team2.teamName} className="w-12 h-12 rounded-full ml-2" />
                    )}
                </div>
            </div>
            <p className="text-gray-500">Status: {match.status}</p>
        </div>
    );
};

export default MatchCard;