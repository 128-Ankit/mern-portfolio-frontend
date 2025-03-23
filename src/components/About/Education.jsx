import React from 'react';
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";
import TimelineItem from './TimelineItem';

const Education = () => {

    const education = [
        {
            year: "2020",
            title: "Bachelor's in Computer Science",
            description: "Graduated with honors, specialized in software engineering.",
            icon: FaGraduationCap
        },
        {
            year: "2018",
            title: "Web Development Bootcamp",
            description: "Intensive training in modern web development technologies.",
            icon: FaGraduationCap
        },
        {
            year: "2016",
            title: "High School Diploma",
            description: "Graduated with distinction in Computer Science.",
            icon: FaGraduationCap
        }
    ];
    return (
        <>
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
            >
                <h2 className="text-3xl font-bold mb-8 text-center">
                    <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                        Education
                    </span>
                </h2>
                <div className="space-y-6">
                    {education.map((item, index) => (
                        <TimelineItem key={index} {...item} />
                    ))}
                </div>
            </motion.div>
        </>
    )
}

export default Education;