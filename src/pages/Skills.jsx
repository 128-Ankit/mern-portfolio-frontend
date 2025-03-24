import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FaReact, FaNodeJs, FaGitAlt, FaDocker, FaAws, FaPython, FaJava, FaJs } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiMongodb, SiExpress, SiCplusplus, SiRust } from "react-icons/si";
import SkillSphere from '../components/Skills/SkillSphere';

const Skills = () => {
    const [activeCategory, setActiveCategory] = useState('all');

    const skillCategories = {
        languages: [
            { name: "JavaScript", level: 92, icon: FaJs, color: "#F7DF1E", description: "Modern JavaScript including ES6+ features" },
            { name: "Python", level: 88, icon: FaPython, color: "#3776AB", description: "Python development with focus on automation and backend" },
            { name: "C++", level: 85, icon: SiCplusplus, color: "#00599C", description: "System programming and performance optimization" },
            { name: "Java", level: 82, icon: FaJava, color: "#007396", description: "Enterprise application development" },
            { name: "Rust", level: 75, icon: SiRust, color: "#000000", description: "Systems programming with memory safety" }
        ],
        frontend: [
            { name: "React", level: 90, icon: FaReact, color: "#61DAFB", description: "Building complex web applications with React and its ecosystem" },
            { name: "TypeScript", level: 85, icon: SiTypescript, color: "#3178C6", description: "Type-safe development with advanced TypeScript features" },
            { name: "Tailwind", level: 88, icon: SiTailwindcss, color: "#06B6D4", description: "Rapid UI development with utility-first CSS" }
        ],
        backend: [
            { name: "Node.js", level: 85, icon: FaNodeJs, color: "#539E43", description: "Server-side JavaScript with Node.js runtime" },
            { name: "Express", level: 82, icon: SiExpress, color: "#ffffff", description: "RESTful API development with Express.js" },
            { name: "MongoDB", level: 80, icon: SiMongodb, color: "#47A248", description: "NoSQL database management and optimization" }
        ],
        tools: [
            { name: "Git", level: 88, icon: FaGitAlt, color: "#F05032", description: "Version control and collaboration" },
            { name: "Docker", level: 75, icon: FaDocker, color: "#2496ED", description: "Containerization and deployment" },
            { name: "AWS", level: 70, icon: FaAws, color: "#FF9900", description: "Cloud infrastructure and services" }
        ]
    };

    return (
        <div className="min-h-screen relative bg-black text-white p-4 sm:p-6 md:p-8">
            {/* Background gradients */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(100,100,255,0.15),transparent_50%)]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 md:mb-16 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"
                >
                    Technical Skills
                </motion.h1>

                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 md:mb-12">
                    {['all', 'languages', 'frontend', 'backend', 'tools'].map((category) => (
                        <motion.button
                            key={category}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveCategory(category)}
                            className={`px-3 py-1.5 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors
                                ${activeCategory === category
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                    : 'bg-gray-800/50 text-gray-400 hover:text-white'}`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </motion.button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 md:gap-12 place-items-center"
                    >
                        {Object.entries(skillCategories)
                            .filter(([category]) => activeCategory === 'all' || category === activeCategory)
                            .flatMap(([_, skills]) => skills)
                            .map((skill, index) => (
                                <div key={index} className="w-full max-w-[150px] sm:max-w-[300px] lg:max-w-none">
                                    <SkillSphere {...skill} />
                                </div>
                            ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Skills;
