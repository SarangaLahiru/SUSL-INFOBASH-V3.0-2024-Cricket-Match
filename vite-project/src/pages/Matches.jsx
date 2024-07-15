// src/components/Matches.jsx
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import MatchCard from "./MatchCard";

const Matches = () => {
    const [matches, setMatches] = useState([]);
    const [teams, setTeams] = useState({});

    useEffect(() => {
        const fetchMatchesAndTeams = async () => {
            try {
                const matchesCollection = collection(db, "matches");
                const matchesSnapshot = await getDocs(matchesCollection);
                const matchesData = matchesSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                const teamsCollection = collection(db, "teams");
                const teamsSnapshot = await getDocs(teamsCollection);
                const teamsData = teamsSnapshot.docs.reduce((acc, doc) => {
                    acc[doc.id] = doc.data();
                    return acc;
                }, {});

                setMatches(matchesData);
                setTeams(teamsData);
            } catch (error) {
                console.error("Error fetching matches and teams:", error);
            }
        };

        fetchMatchesAndTeams();
    }, []);

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Matches</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {matches.map((match) => (
                    <MatchCard key={match.id} match={match} teams={teams} />
                ))}
            </div>
        </div>
    );
};

export default Matches;
