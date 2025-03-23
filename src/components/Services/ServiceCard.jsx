import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaServer, FaMobile, FaDatabase, FaCloud, FaCog } from 'react-icons/fa';

const ServiceCard = ({ icon: Icon, title, description, gradient }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className={`group relative p-8 rounded-2xl 
            bg-gradient-to-br ${gradient}
            border border-white/10 backdrop-blur-sm`}
    >
        <motion.div 
            className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-20"
            whileHover={{
                boxShadow: "0 0 30px rgba(124,58,237,0.5)",
            }}
        />
        <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent 
                    bg-gradient-to-r from-white to-gray-300">{title}</h3>
                <div className="p-3 rounded-full bg-white/10 backdrop-blur-md">
                    <Icon className="text-2xl text-white transform group-hover:scale-110 
                        transition-transform duration-300" />
                </div>
            </div>
            <p className="text-gray-300/90 text-sm leading-relaxed backdrop-blur-sm">{description}</p>
        </div>
    </motion.div>
);

export default ServiceCard;