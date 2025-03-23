import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";

const TimelineItem = ({ year, position, description, type = 'education' }) => (
    <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex gap-4 relative"
    >
        <div className="flex flex-col items-center">
            <div className="bg-blue-500/20 p-3 rounded-full">
                {type === 'education' ? (
                    <FaGraduationCap className="text-blue-400" />
                ) : (
                    <FaBriefcase className="text-blue-400" />
                )}
            </div>
            <div className="w-0.5 h-full bg-gray-700/30" />
        </div>
        <div className="bg-gray-900/30 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 mb-8">
            <span className="text-blue-400 font-medium">{year}</span>
            <h3 className="text-xl font-semibold mt-2">{position}</h3>
            <p className="text-gray-400 mt-2">{description}</p>
        </div>
    </motion.div>
);

export default TimelineItem;