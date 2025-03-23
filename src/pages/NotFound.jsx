import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
    return (
        <motion.div 
            className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h1 
                className="text-8xl font-bold text-blue-500 mb-4"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
            >
                404
            </motion.h1>
            <motion.p 
                className="text-xl mb-8 text-gray-400"
                initial={{ y: -30 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3 }}
            >
                Oops! Page not found
            </motion.p>
            <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <Link 
                    to="/"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl
                             bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-xl
                             border border-gray-700/30 text-gray-300
                             hover:text-blue-400 transition-all duration-300"
                >
                    <FaHome /> Go Home
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default NotFound;
