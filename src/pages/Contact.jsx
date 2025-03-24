import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import ContactInfo from '../components/Contact/ContactInfo';
 
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log(formData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const socialLinks = [
        { icon: FaGithub, url: 'https://github.com/128-Ankit' },
        { icon: FaLinkedin, url: 'https://www.linkedin.com/in/ankit-kumar-276941295' },
        { icon: FaTwitter, url: '#' }
    ];

    return (
        <div className="min-h-screen relative bg-[#030014] text-white py-10 sm:py-20 px-4 overflow-hidden">
            <div className="absolute inset-0">
                {[...Array(50)].map((_, i) => (
                    <div key={i}
                        className="absolute h-1 w-1 bg-white rounded-full animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            opacity: Math.random() * 0.5 + 0.2
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10 sm:mb-20"
                >
                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 relative inline-block"
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
                        Get in Touch
                    </motion.h1>
                    <p className="text-purple-300/80 text-base sm:text-lg max-w-2xl mx-auto px-4">
                        Let's discuss your project and bring your ideas to life
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4 sm:space-y-6"
                    >
                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-3 sm:p-4 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-3 sm:p-4 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                                />
                            </div>
                            <div>
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    className="w-full p-3 sm:p-4 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium transform transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                            >
                                Send Message
                            </button>
                        </form>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-4 sm:space-y-6"
                    >
                        <div className="grid gap-4 sm:gap-6">
                            <ContactInfo icon={FaEnvelope} title="Email" content="connectwithankit2@gmail.com" />
                            <ContactInfo icon={FaPhone} title="Phone" content="+91 7388480128" />
                            <ContactInfo icon={FaMapMarkerAlt} title="Location" content="Bhadohi, India" />
                        </div>
                        
                        <div className="pt-4 sm:pt-6">
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Follow Me</h3>
                            <div className="flex space-x-3 sm:space-x-4">
                                {socialLinks.map((social, index) => (
                                    <Link
                                        key={index}
                                        to={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 sm:p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300"
                                    >
                                        <social.icon className="text-lg sm:text-xl text-purple-400" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
