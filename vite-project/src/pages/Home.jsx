import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebaseConfig";
import CountdownTimer from "../components/CountdownTimer";
import { ImageCarousel } from "../components/Images";

const Home = ({ user }) => {
    const [team, setTeam] = useState(null);
    const [allTeams, setAllTeams] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
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

            navigate('/register');
        } catch (error) {
            console.error("Error signing in with Google:", error);
            setError("Error signing in with Google. Please try again.");
        }
    };

    return (
        <>
          
            <div className="min-h-screen flex flex-col items-center justify-center  text-white relative overflow-hidden">

                <div className="absolute top-0 left-0 w-full h-full z-10">
                    <ImageCarousel />
                </div>
                <div className="absolute top-0 left-0  z-20"></div>
                <div className="relative z-30 flex flex-col items-center justify-center md:p-10  py-10 px-4 -top-24 md:w-8/12  w-10/12 rounded-xl" style={{ backgroundColor: " rgba(0, 0, 0, 0.807)" }}>
                    <h1 className="md:text-8xl text-3xl font-montserrat font-bold mb-8 animate-fade-in">INFO BASH V2.0</h1>
                    <p className="text-xl mb-6 animate-fade-in text-center delay-1s">Join the competition and register your team now!</p>
                        <div className="">
                    <CountdownTimer targetDate={new Date("2024-07-25T07:59:59")} />
                </div>
                    <button
                        onClick={signInWithGoogle}
                        className="bg-gradient-to-r from-yellow-500 to-yellow-900 text-white px-6 py-3 rounded-full shadow-lg  hover:shadow-xl focus:outline-none flex items-center"
                    >
                        <FcGoogle className="mr-2" size={24} />
                        Register your team
                    </button>
                    {/* {error && <p className="-mt-4 text-red-500">{error}</p>} */}

                </div>
            </div>

        </>
    );
};

export default Home;
