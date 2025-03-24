import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, TorusKnot, MeshDistortMaterial } from "@react-three/drei";
import { FaGithub, FaLinkedin, FaArrowRight, FaEdit, FaTrash } from "react-icons/fa";

import MovingLight from "../components/Home/MovingLight";
import HorizontalNav from "../components/Home/HorizontalNav";

import { getHomeData, updateHomeData } from '../api.js';

const Home = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [title, setTitle] = useState("Welcome to my portfolio");
    const [heading, setHeading] = useState("Hello, I'm");
    const [name, setName] = useState("Ankit Pathak");
    const [description, setDescription] = useState("A Full Stack Developer crafting stunning, high-performance web applications with the latest technologies.");
    const [socialUrls, setSocialUrls] = useState({
        github: "https://github.com/128-Ankit",
        linkedin: "https://www.linkedin.com/in/ankit-kumar-276941295/"
    });
    const [isLoading, setIsLoading] = useState(false);
    const [updateStatus, setUpdateStatus] = useState('');
    const [id, setId] = useState(null);

    // Function to fetch home data from the server
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getHomeData();
                console.log("data: ", data[0]);
                const Data = data[0];
                if (Data) {
                    setId(Data._id);  // Store the ID from fetched data
                    setTitle(Data.title || title);
                    setHeading(Data.heading || heading);
                    setName(Data.name || name);
                    setDescription(Data.description || description);
                    setSocialUrls(Data.socialUrls || socialUrls);
                }
            } catch (error) {
                console.error("Error fetching home data:", error);
            }
        };

        fetchData();
        const token = localStorage.getItem('authToken');
        if (token) setIsAdmin(true);
    }, []);

    // Function to update home data 
    const updateData = async () => {
        try {
            setIsLoading(true);
            setUpdateStatus('Saving...');
            const data = {
                title,
                heading,
                name,
                description,
                socialUrls,
                id  
            };
            await updateHomeData(data);
            setUpdateStatus('Changes saved successfully!');
            setTimeout(() => setUpdateStatus(''), 3000);
        } catch (error) {
            console.error("Error updating home data:", error);
            setUpdateStatus('Error saving changes');
            setTimeout(() => setUpdateStatus(''), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    // Authentication for updating and delating home data
    const AdminButton = ({ onEdit, onDelete }) => (
        isAdmin && (
            <div className="flex gap-2 ml-2">
                <button onClick={onEdit} className="p-1 text-blue-400 hover:text-blue-300">
                    <FaEdit />
                </button>
                <button onClick={onDelete} className="p-1 text-red-400 hover:text-red-300">
                    <FaTrash />
                </button>
            </div>
        )
    );
    
    // Social URL update prompt
    const updateSocialUrl = (platform) => {
        const newUrl = prompt(`Enter new ${platform} URL:`, socialUrls[platform]);
        if (newUrl) {
            setSocialUrls(prev => ({
                ...prev,
                [platform]: newUrl
            }));
        }
    };

    return (
        <div className="min-h-screen relative flex flex-col lg:flex-row items-center justify-between overflow-hidden">
            {/* Add save button if user is admin */}
            {isAdmin && (
                <div className="fixed top-2 right-2 md:top-4 md:right-4 z-50 flex items-center gap-2">
                    <span className={`text-xs md:text-sm ${updateStatus.includes('Error') ? 'text-red-400' : 'text-green-400'}`}>
                        {updateStatus}
                    </span>
                    <button
                        onClick={updateData}
                        disabled={isLoading}
                        className="px-2 py-1 md:px-4 md:py-2 text-sm md:text-base bg-blue-500 hover:bg-blue-600 rounded-md text-white 
                                 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            )}
            {/* Background gradients */}
            <div className="absolute inset-0 bg-black z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(100,100,255,0.15),transparent_50%)]" />
            </div>

            {/* Left Section */}
            <div className="relative z-10 flex flex-col items-start gap-6 md:gap-10 w-full lg:w-auto max-w-2xl p-4 md:p-8 lg:p-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4 md:space-y-6 w-full"
                >
                    <div className="flex items-center">
                        <h2 className="text-xl md:text-2xl font-medium text-blue-400/80">{title}</h2>
                        <AdminButton
                            onEdit={() => {
                                const newTitle = prompt("Enter new title:", title);
                                if (newTitle) setTitle(newTitle);
                            }}
                            onDelete={() => setTitle("")}
                        />
                    </div>

                    <div className="flex items-start md:items-center flex-wrap">
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                            {heading}{" "}
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                                {name}
                            </span>
                        </h1>
                        <AdminButton
                            onEdit={() => {
                                const newHeading = prompt("Enter new heading:", heading);
                                const newName = prompt("Enter new name:", name);
                                if (newHeading) setHeading(newHeading);
                                if (newName) setName(newName);
                            }}
                            onDelete={() => {
                                setHeading("");
                                setName("");
                            }}
                        />
                    </div>

                    <div className="flex items-start">
                        <p className="text-base md:text-xl text-gray-400 leading-relaxed max-w-xl">
                            {description}
                        </p>
                        <AdminButton
                            onEdit={() => {
                                const newDesc = prompt("Enter new description:", description);
                                if (newDesc) setDescription(newDesc);
                            }}
                            onDelete={() => setDescription("")}
                        />
                    </div>
                </motion.div>

                <motion.div
                    className="flex flex-wrap gap-4 md:gap-6 items-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <a href="#portfolio"
                        className="group bg-gradient-to-r from-blue-500 to-purple-500 p-[1px] rounded-full">
                        <div className="px-4 md:px-8 py-2 md:py-4 rounded-full bg-gray-900/50 hover:bg-transparent 
                                    transition-all duration-300 backdrop-blur-xl flex items-center gap-3 text-sm md:text-base">
                            <span>View My Work</span>
                            <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </div>
                    </a>

                    {/* Social links section */}
                    <div className="flex gap-3 md:gap-4">
                        {[
                            { icon: FaGithub, url: socialUrls.github, platform: 'github' },
                            { icon: FaLinkedin, url: socialUrls.linkedin, platform: 'linkedin' }
                        ].map((social, index) => (
                            <div key={index} className="flex items-center">
                                <motion.a
                                    whileHover={{ scale: 1.1, y: -5 }}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 md:p-4 rounded-full bg-gray-900/50 hover:bg-gray-800/50 
                                             backdrop-blur-xl border border-gray-700/30 text-xl md:text-2xl
                                             text-gray-400 hover:text-blue-400 transition-colors duration-300"
                                >
                                    <social.icon />
                                </motion.a>
                                {isAdmin && (
                                    <button
                                        onClick={() => updateSocialUrl(social.platform)}
                                        className="ml-2 p-1 text-blue-400 hover:text-blue-300"
                                    >
                                        <FaEdit />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>

                <HorizontalNav />
            </div>

            {/* Right Section - 3D Torus Knot */}
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[600px] lg:w-1/2">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl" />
                <Canvas>
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
                    <ambientLight intensity={0.2} />
                    <MovingLight />
                    <TorusKnot args={[1, 0.4, 256, 64]} scale={1.6}>
                        <MeshDistortMaterial
                            color="#4D79FF"
                            attach="material"
                            distort={0.4}
                            speed={2}
                            metalness={0.9}
                            roughness={0.2}
                        />
                    </TorusKnot>
                </Canvas>
            </div>
        </div>
    );
};

export default Home;