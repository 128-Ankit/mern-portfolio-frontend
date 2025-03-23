import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import TimelineItem from './TimelineItem';
import { getExperience } from '../../api';

const Experience = () => {
    const [loading, setLoading] = useState(false);
    const [experience, setExperiences] = useState([]);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                setLoading(true);
                const data = await getExperience();
                setExperiences(data.experiences);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching experience:', error);
                setLoading(false);
            }
        }
        fetchExperience();
    }, []);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
            >
                <h2 className="text-3xl font-bold mb-8 text-center">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                        Experience
                    </span>
                </h2>
                <div className="space-y-6">
                    {experience.map((item, index) => (
                        <div key={index} className="relative">
                            <TimelineItem {...item} />
                        </div>
                    ))}
                </div>
            </motion.div>
        </>
    )
}

export default Experience;