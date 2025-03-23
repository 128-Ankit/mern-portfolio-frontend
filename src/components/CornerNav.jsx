import { motion } from "framer-motion";
import { FaHome, FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const CornerNav = () => {
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the token from local storage
        const storedToken = localStorage.getItem("authToken");
        setToken(storedToken);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setToken(null);
        alert("Logout successful");
        navigate('/');
    };

    return (
        <motion.div
            className="fixed bottom-8 right-8 flex gap-4 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            {[
                { icon: FaHome, label: 'Home', href: '/' },
                { 
                    icon: FaSignInAlt, 
                    label: token ? 'Logout' : 'Login', 
                    href: token ? '#' : '/login',
                    onClick: token ? handleLogout : undefined
                }
            ].map((item, index) => (
                <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="relative group"
                >
                    <motion.div
                        className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 
                                 bg-gray-900/90 rounded-lg text-sm pointer-events-none 
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                                 whitespace-nowrap border border-gray-700/30 backdrop-blur-sm text-blue-400"
                    >
                        {item.label}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 
                                    border-4 border-transparent border-t-gray-900/90" />
                    </motion.div>
                    <Link
                        to={item.href}
                        onClick={item.onClick}
                        className="flex items-center justify-center w-12 h-12 rounded-xl
                                 bg-gray-900/50 hover:bg-gray-800/50 backdrop-blur-xl
                                 border border-gray-700/30 text-xl text-gray-400
                                 hover:text-blue-400 transition-all duration-300
                                 shadow-lg hover:shadow-xl"
                    >
                        <item.icon />
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default CornerNav;
