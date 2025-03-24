
import React from 'react';
import { motion } from "framer-motion";
import Profile from '../components/About/Profile';
import Skills from '../components/About/Skills';
import Experience from '../components/About/Experience';
import Education from '../components/About/Education';


const About = () => {

    return (
        <div className="min-h-screen relative bg-black text-white p-8">
            {/* Background gradients */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(100,100,255,0.15),transparent_50%)]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                        About Me
                    </h1>

                    {/* Profile Section */}
                    <Profile />
                </motion.div>

                {/* Skills Section */}
                <Skills />

                {/* Experience & Education Section */}
                <div className="grid md:grid-cols-2 gap-8 mt-16">
                    <Experience />
                    <Education />
                </div>
            </div>
        </div>
    );
};

export default About;