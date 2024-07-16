import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Import signInWithPopup and GoogleAuthProvider
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import Firestore functions
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc"; // Import Google icon
import { auth, db } from "../../firebaseConfig"; // Import Firebase functions
import CountdownTimer from "../components/CountdownTimer";
import { ImageCarousel } from "../components/Images"; // Ensure the path is correct
import TeamRegistration from "./TeamRegistration";

const Home = ({ user }) => {
    const [team, setTeam] = useState(null);
    const [allTeams, setAllTeams] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the user's team if the user is authenticated
        const fetchTeam = async () => {
            if (user) {
                try {
                    const userDoc = doc(db, `users/${user.uid}`);
                    const userDocSnap = await getDoc(userDoc);

                    if (userDocSnap.exists()) {
                        const userData = userDocSnap.data();
                        setTeam(userData.team);
                    }
                } catch (error) {
                    console.error("Error fetching team:", error);
                    setError("Error fetching team information.");
                }
            }
        };

        fetchTeam();
    }, [user]);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const userDoc = doc(db, `users/${user.uid}`);
            const userDocSnap = await getDoc(userDoc);

            if (!userDocSnap.exists()) {
                await setDoc(userDoc, { email: user.email, name: user.displayName, avatar: user.photoURL });
            }
        } catch (error) {
            console.error("Error signing in with Google:", error);
            setError("Error signing in with Google. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center relative " >
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {user ? (
                <>

                    <TeamRegistration user={user} />

                </>
            ) : (
                <div className="absolute w-full flex flex-col items-center -mt-72" >
                    <div className="w-full" >
                        <ImageCarousel />
                    </div>
                    <div className="mt-8 relative z-50">
                        <button
                            onClick={signInWithGoogle}
                            className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-full shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl focus:outline-none flex items-center"
                        >
                            <FcGoogle className="mr-2" size={24} />
                            Register your team
                        </button>
                    </div>
                    <div className=" absolute w-50 m-auto mt-72">
                        <CountdownTimer targetDate={new Date("2024-12-31T23:59:59")} />

                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
