import { useNavigate } from "react-router-dom";
import { FaUser, FaCode, FaCog, FaFolder, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const HorizontalNav = () => {

    const navigate = useNavigate();

    const menuItems = [
        { label: 'About', icon: FaUser, color: '#FF4D4D', path: '/about' },
        { label: 'Skills', icon: FaCode, color: '#4D79FF', path: '/skills' },
        { label: 'Services', icon: FaCog, color: '#FF4DFF', path: '/services' },
        { label: 'Projects', icon: FaFolder, color: '#4DFFFF', path: '/projects' },
        { label: 'Contact', icon: FaEnvelope, color: '#FFD700', path: '/contact' },
    ];

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <motion.div 
            className="flex gap-6 w-full justify-center md:justify-start mt-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            {menuItems.map((item, index) => (
                <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="relative group"
                    onClick={() => handleNavigation(item.path)}
                >
                    <motion.div
                        className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900/90 
                                 rounded-lg text-sm pointer-events-none opacity-0 group-hover:opacity-100 
                                 transition-opacity duration-300 whitespace-nowrap border border-gray-700/30
                                 backdrop-blur-sm"
                        style={{ color: item.color }}
                    >
                        {item.label}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 
                                    border-4 border-transparent border-t-gray-900/90" />
                    </motion.div>
                    <button
                        className="flex items-center gap-3 p-4 rounded-2xl
                                 bg-gray-900/50 hover:bg-gray-800/50 
                                 backdrop-blur-xl border border-gray-700/30
                                 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <item.icon 
                            className="text-2xl"
                            style={{ color: item.color }}
                        />
                    </button>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default HorizontalNav;