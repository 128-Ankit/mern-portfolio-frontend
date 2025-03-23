import React from 'react';
import { motion } from "framer-motion";

const SkillSphere = ({ icon: Icon, name, level, color, description }) => (
    <motion.div
        whileHover={{ scale: 1.1 }}
        className="relative group"
    >
        <motion.div
            animate={{
                y: [0, -10, 0],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className="flex flex-col items-center"
        >
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl" />
                <div
                    className="w-24 h-24 rounded-full flex items-center justify-center relative overflow-hidden"
                    style={{ background: `linear-gradient(45deg, ${color}22, ${color}44)` }}
                >
                    <Icon className="text-4xl" style={{ color }} />
                    <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke={color}
                            strokeWidth="2"
                            strokeDasharray={`${level * 2.83} 283`}
                            transform="rotate(-90 50 50)"
                            className="opacity-50"
                        />
                    </svg>
                </div>
            </div>
            <span className="mt-4 font-medium text-gray-200">{name}</span>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full w-48 p-4 bg-gray-900/90 backdrop-blur-sm rounded-lg border border-gray-700/50 invisible group-hover:visible"
        >
            <p className="text-sm text-gray-300">{description}</p>
            <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-400">Proficiency</span>
                <span className="text-xs font-medium" style={{ color }}>{level}%</span>
            </div>
        </motion.div>
    </motion.div>
);

export default SkillSphere;