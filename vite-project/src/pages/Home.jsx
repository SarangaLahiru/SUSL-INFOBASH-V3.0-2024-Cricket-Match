import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { Avatar, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebaseConfig";
import CountdownTimer from "../components/CountdownTimer";
import { ImageCarousel } from "../components/Images";

const Home = ({ user }) => {
    const [team, setTeam] = useState(null);
    const [allTeams, setAllTeams] = useState([]);
    const [loading, setLoading] = useState(false);
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

        const fetchAllTeams = async () => {
            setLoading(true)
            try {
                const teamsCollection = collection(db, "teams");
                const teamsSnapshot = await getDocs(teamsCollection);
                const teamsList = teamsSnapshot.docs.map(doc => doc.data());
                setAllTeams(teamsList);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching teams:", error);
                setError("Error fetching team information.");
                setLoading(false)
            }
        };

        fetchTeam();
        fetchAllTeams();
    }, [user]);

    const signInWithGoogle = async () => {
        setLoading(true)
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const userDoc = doc(db, `users/${user.uid}`);
            const userDocSnap = await getDoc(userDoc);

            if (!userDocSnap.exists()) {
                await setDoc(userDoc, { email: user.email, name: user.displayName, avatar: user.photoURL });
            }
            setLoading(false)

            navigate('/register');
        } catch (error) {
            console.error("Error signing in with Google:", error);
            setError("Error signing in with Google. Please try again.");
            setLoading(false)
        }
    };

    return (
        <>
            {loading ? (
                <div className="w-full mt-40">
                    <div className=" w-2 m-auto">
                        <Spinner color="warning" aria-label="Warning spinner example" size="lg" />
                    </div>
                </div>

            ) : (
                <div>
                    <div className="flex justify-center">
                        <CountdownTimer targetDate={new Date("2024-12-31T23:59:59")} />
                    </div >
                    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full z-10">
                            <ImageCarousel />
                        </div>

                        <div className="relative max-sm:w-[300px] z-30 flex flex-col items-center justify-center rounded-lg shadow-lg p-6 sm:p-10 md:p-16 -top-12 md:-top-24 bg-black bg-opacity-60">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 animate-fade-in">Welcome to Info Bash</h1>
                            <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 md:mb-8 animate-fade-in delay-1s text-center">Join the competition and register your team now!</p>
                            <button
                                onClick={signInWithGoogle}
                                className="bg-gradient-to-r from-yellow-500 to-yellow-900 text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full shadow-lg hover:shadow-xl focus:outline-none flex items-center"
                            >
                                <FcGoogle className="mr-2" size={24} />
                                Register your team
                            </button>
                            {error && <p className="mt-4 text-red-500">{error}</p>}
                        </div>
                        <div className="w-full px-4  left-2 mt-20 absolute z-30 max-sm:mt-[220px]">

                            <div className="flex flex-wrap justify-center gap-4">
                                <Avatar.Group>
                                    {allTeams.slice(0, 4).map((team, index) => (
                                        <Avatar key={index} img={team.teamLogo} rounded stacked />
                                    ))}
                                    {allTeams.length > 4 && (
                                        <Avatar.Counter total={allTeams.length - 4} href="#" />
                                    )}
                                </Avatar.Group>
                            </div>
                        </div>
                    </div>
                </div >
            )

            }

        </>
    );
};

export default Home;
