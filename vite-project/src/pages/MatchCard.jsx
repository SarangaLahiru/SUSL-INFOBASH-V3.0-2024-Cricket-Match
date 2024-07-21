import React from "react";

const MatchCard = ({ match, teams }) => {
    const team1 = teams[match.team1Id];
    const team2 = teams[match.team2Id];

    return (
        <div
            className="mx-3 p-6 sm:p-8 md:p-10 lg:p-14 rounded-lg shadow-md"
            style={{
                backgroundColor: 'rgba(0, 0, 20, 0.8)', // Transparent background color
                border: '6px solid gold', // Gold border style
                borderRadius: '0.6rem' // Rounded corners
            }}
        >
            <div className="font-semibold text-center text-xl md:text-2xl lg:text-3xl mb-4">Round Matches</div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <div className="flex flex-col items-center mb-4 md:mb-0">
                    <span className="font-semibold text-lg md:text-xl">{team1 ? team1.teamName : "Unknown Team"}</span>
                    {team1 && team1.teamLogo && (
                        <img
                            src={team1.teamLogo}
                            alt={team1.teamName}
                            className="w-32 h-32 md:w-44 md:h-44 rounded-full mt-3"
                        />
                    )}
                </div>
                <div className="flex flex-col items-center mb-4 md:mb-0">
                    <img
                        src="./img/vs.png"
                        className="w-32 h-32 md:w-48 md:h-44 rounded-full mb-2"
                        alt="vs"
                    />
                </div>
                <div className="flex flex-col items-center mb-4 md:mb-0">
                    <span className="font-semibold text-lg md:text-xl">{team2 ? team2.teamName : "Unknown Team"}</span>
                    {team2 && team2.teamLogo && (
                        <img
                            src={team2.teamLogo}
                            alt={team2.teamName}
                            className="w-32 h-32 md:w-44 md:h-44 rounded-full mt-3"
                        />
                    )}
                </div>
            </div>
            <p className="text-gray-500 text-center text-sm md:text-lg">Status: {match.status}</p>
        </div>
    );
};

export default MatchCard;
