import React from "react";

const MatchCard = ({ match, teams }) => {
    const team1 = teams[match.team1Id];
    const team2 = teams[match.team2Id];

    return (
        <div className='grid grid-cols-1   gold-gradient-border p-14 rounded-lg shadow-md' style={{ backgroundColor: '#05080f' }}>
               <div className="font-semibold text-center text-xl">Round Matches</div>
            <div className="flex justify-between items-center mb-9">
                <div className="flex flex-col items-center">
                <span className="font-semibold">{team1 ? team1.teamName : "Unknown Team"}</span>
                    {team1 && team1.teamLogo && (
                        <img src={team1.teamLogo} alt={team1.teamName} className="w-44 h-44 rounded-full mb-2" />
                    )}
                    
                </div>
                <div className="flex flex-col items-center">
             
                <img src="./img/vs.png" className="w-32 h-28 rounded-full mb-2" />
                </div>
                <div className="flex flex-col items-center">
                    <span className="font-semibold">{team2 ? team2.teamName : "Unknown Team"}</span>
                    {team2 && team2.teamLogo && (
                        <img src={team2.teamLogo} alt={team2.teamName} className="w-44 h-44 rounded-full mt-2" />
                    )}
                </div>
            </div>
            <p className="text-gray-500 text-center text-lg">Status: {match.status}</p>
        </div>
    );
};

export default MatchCard;
