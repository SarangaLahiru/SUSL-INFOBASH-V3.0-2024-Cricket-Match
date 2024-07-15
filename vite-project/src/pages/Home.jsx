// src/pages/Home.jsx
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Import signInWithPopup and GoogleAuthProvider
import React, { useState } from "react";
import { auth, db, } from "../../firebase"; // Import Firebase functions
import TeamRegistration from "./TeamRegistration";

const Home = ({ user }) => {
    const [team, setTeam] = useState(null);
    const [allTeams, setAllTeams] = useState([]);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider(); // Create GoogleAuthProvider instance
        try {
            const result = await signInWithPopup(auth, provider); // Sign in with Google popup
            const user = result.user;
            const userDoc = db.doc(`users/${user.uid}`);
            const userDocSnap = await getDoc(userDoc);

            if (!userDocSnap.exists()) {
                // If user doc doesn't exist, create new user document
                await setDoc(userDoc, { email: user.email, name: user.displayName, avatar: user.photoURL });
            }
        } catch (error) {
            console.error("Error signing in with Google:", error);
            throw error;
        }
    };



    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            {user ? (
                <>

                    {team ? (
                        <div className="w-full max-w-2xl bg-white p-8 rounded shadow-md mt-8">
                            <h2 className="text-2xl font-bold mb-4">Your Team</h2>
                            <ul>
                                {team.members.map((member, index) => (
                                    <li key={index} className="mb-2">
                                        {member.name} ({member.email})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <TeamRegistration user={user} />
                    )}

                </>
            ) : (
                <button onClick={signInWithGoogle} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Sign In with Google
                </button>
            )}
        </div>
    );
};

export default Home;
