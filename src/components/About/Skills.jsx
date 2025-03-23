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
        <>
            {token && (
                <div className="mb-4 flex justify-end">
                    {editMode ? (
                        <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-4 py-2 rounded-md"
                        >
                            Save Changes
                        </button>
                    ) : (
                        <button
                            onClick={() => setEditMode(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
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
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
            >
                {editedSkills.map((skill, index) => (
                    <SkillCard 
                        key={index} 
                        icon={skill.icon}
                        title={skill.title}
                        description={skill.description}
                        color={skill.color}
                        editable={editMode}
                        onEdit={(newDescription) => handleEdit(index, newDescription)}
                    />
                ))}
            </motion.div>
        </>
    )
}

export default Skills;