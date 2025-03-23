import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaServer, FaMobile, FaDatabase, FaCloud, FaCog } from 'react-icons/fa';
import ServiceCard from '../components/Services/ServiceCard';

const Services = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    
    const categories = [
        { id: 'all', name: 'All Services' },
        { id: 'frontend', name: 'Frontend' },
        { id: 'backend', name: 'Backend' },
        { id: 'mobile', name: 'Mobile' },
    ];

    const services = [
        {
            icon: FaCode,
            title: "Frontend Development",
            description: "Building responsive and interactive web applications using modern frameworks and tools.",
            gradient: "from-blue-900/50 to-purple-900/50",
            category: 'frontend'
        },
        {
            icon: FaServer,
            title: "Backend Development",
            description: "Developing robust server-side applications and RESTful APIs.",
            gradient: "from-purple-900/50 to-pink-900/50",
            category: 'backend'
        },
        {
            icon: FaMobile,
            title: "Mobile Development",
            description: "Creating cross-platform mobile applications with React Native.",
            gradient: "from-pink-900/50 to-red-900/50",
            category: 'mobile'
        },
        {
            icon: FaDatabase,
            title: "Database Design",
            description: "Designing and optimizing database schemas for scalable applications.",
            gradient: "from-red-900/50 to-orange-900/50",
            category: 'backend'
        },
        {
            icon: FaCloud,
            title: "Cloud Solutions",
            description: "Deploying and managing applications on cloud platforms.",
            gradient: "from-orange-900/50 to-yellow-900/50",
            category: 'backend'
        },
        {
            icon: FaCog,
            title: "System Architecture",
            description: "Designing scalable and maintainable system architectures.",
            gradient: "from-yellow-900/50 to-green-900/50",
            category: 'backend'
        }
    ];

    const filteredServices = services.filter(service => 
        activeCategory === 'all' || service.category === activeCategory
    );

    const stars = useMemo(() => {
        return [...Array(50)].map((_, i) => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            delay: `${Math.random() * 2}s`,
            opacity: Math.random() * 0.5 + 0.2
        }));
    }, []);

    return (
        <div className="min-h-screen relative bg-[#030014] text-white py-20 px-4 overflow-hidden">
            <div className="absolute inset-0">
                {stars.map((star, i) => (
                    <div
                        key={i}
                        className="absolute h-1 w-1 bg-white rounded-full animate-pulse"
                        style={{
                            top: star.top,
                            left: star.left,
                            animationDelay: star.delay,
                            opacity: star.opacity
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <motion.h1
                        className="text-7xl font-bold mb-6 relative inline-block"
                        animate={{ 
                            textShadow: [
                                "0 0 20px rgba(124,58,237,0.5)",
                                "0 0 60px rgba(124,58,237,0.2)",
                                "0 0 20px rgba(124,58,237,0.5)",
                            ]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                    >
                        Services
                    </motion.h1>
                    <p className="text-purple-300/80 text-lg max-w-2xl mx-auto">
                        Transforming ideas into digital reality with cutting-edge solutions
                    </p>
                </motion.div>

                <div className="flex justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <motion.button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-6 py-2 rounded-full border ${
                                activeCategory === category.id 
                                    ? 'border-purple-500 bg-purple-500/20' 
                                    : 'border-white/10'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {category.name}
                        </motion.button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredServices.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ServiceCard {...service} />
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Services;
