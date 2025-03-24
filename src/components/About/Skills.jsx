import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import SkillCard from './SkillCard';
import { FaCode, FaServer, FaDatabase, FaTools } from "react-icons/fa";

const Skills = () => {
    const token = localStorage.getItem('authToken');
    
    const defaultSkills = [
        {
            icon: FaCode,
            title: "Frontend Development",
            description: "React, Next.js, TypeScript, Tailwind CSS",
            color: "#4D79FF"
        },
        {
            icon: FaServer,
            title: "Backend Development",
            description: "Node.js, Express, Python, Django",
            color: "#FF4D4D"
        },
        {
            icon: FaDatabase,
            title: "Database",
            description: "MongoDB, PostgreSQL, Redis",
            color: "#4DFFFF"
        },
        {
            icon: FaTools,
            title: "Tools & Others",
            description: "Git, Docker, AWS, CI/CD",
            color: "#FFD700"
        }
    ];

    const [editMode, setEditMode] = useState(false);
    const [editedSkills, setEditedSkills] = useState([]);

    useEffect(() => {
        const savedSkills = localStorage.getItem('skills');
        if (!savedSkills) {
            localStorage.setItem('skills', JSON.stringify(defaultSkills));
            setEditedSkills(defaultSkills);
        } else {
            const parsedSkills = JSON.parse(savedSkills);
            // Map icons back to components after loading from localStorage
            const skillsWithIcons = parsedSkills.map((skill, index) => ({
                ...skill,
                icon: defaultSkills[index].icon
            }));
            setEditedSkills(skillsWithIcons);
        }
    }, []);

    const handleEdit = (index, newDescription) => {
        const newSkills = [...editedSkills];
        newSkills[index].description = newDescription;
        setEditedSkills(newSkills);
    };

    const handleSave = () => {
        // Save without icon property to avoid serialization issues
        const skillsToSave = editedSkills.map(({ icon, ...rest }) => rest);
        localStorage.setItem('skills', JSON.stringify(skillsToSave));
        setEditMode(false);
    };

    return (
        <div className="w-full container mx-auto px-4 sm:px-6 lg:px-8">
            {token && (
                <div className="mb-4 flex justify-end px-2 sm:px-0">
                    {editMode ? (
                        <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-md transition-all hover:bg-green-600"
                        >
                            Save Changes
                        </button>
                    ) : (
                        <button
                            onClick={() => setEditMode(true)}
                            className="bg-blue-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-md transition-all hover:bg-blue-600"
                        >
                            Edit Skills
                        </button>
                    )}
                </div>
            )}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.2,
                    staggerChildren: 0.1,
                    delayChildren: 0.3
                }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16"
            >
                {editedSkills.map((skill, index) => (
                    <div 
                        key={index} 
                        className="w-full transform transition-transform hover:scale-[1.02]"
                    >
                        <SkillCard 
                            icon={skill.icon}
                            title={skill.title}
                            description={skill.description}
                            color={skill.color}
                            editable={editMode}
                            onEdit={(newDescription) => handleEdit(index, newDescription)}
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

export default Skills;