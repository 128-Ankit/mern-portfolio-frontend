import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaSadCry, FaUserCog } from 'react-icons/fa';
import ProjectCard from '../components/Project/ProjectCard';
import { getProjects } from "../api.js"
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/common/Spinner.jsx';


const Projects = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(0);
    const [isAdmin, setIsAdmin] = useState();
    const projectsPerPage = 3;


    //isAdmin or not
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsAdmin(token);
    }, []);


    // Reset page when filter changes
    useEffect(() => {
        setCurrentPage(0);
    }, [activeFilter]);

    // get projects from db
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await getProjects();
                setProjects(response);
                setLoading(false);
            } catch (error) {
                console.log(error.messge + error);
            }
        }
        fetchProjects();
    }, []);

    console.log("projects: ", projects);

    const filters = [
        { name: 'all', label: 'All' },
        { name: 'frontend', label: 'Frontend' },
        { name: 'fullstack', label: 'Full Stack' },
        { name: 'ai', label: 'AI/ML' }
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    const pageCount = Math.ceil(filteredProjects.length / projectsPerPage);

    const currentProjects = filteredProjects.slice(
        currentPage * projectsPerPage,
        (currentPage + 1) * projectsPerPage
    );

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % pageCount);
    };

    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 + pageCount) % pageCount);
    };

    const handleFilterClick = (filterName) => {
        setActiveFilter(filterName);
        setCurrentPage(0); // Reset to first page when filter changes
    };

    const isFirstPage = currentPage === 0;
    const isLastPage = currentPage === pageCount - 1;

    return (
        <div className='min-h-screen relative bg-black text-white p-2 sm:p-4 md:p-6 lg:p-8'>
            {loading ? (
                <div className="h-[60vh] flex items-center justify-center">
                    <Spinner />
                </div>
            ) : (
                <div className="min-h-screen relative">
                    {/* admin icon */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate('/admin-project')}
                        className={`${isAdmin ? "fixed top-2 right-2 sm:top-4 sm:right-4 lg:top-6 lg:right-6 z-20 p-2 rounded-full bg-gray-800/50 text-gray-400 hover:text-white" : "hidden"}`}
                    >
                        <FaUserCog size={20} className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    </motion.button>

                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(100,100,255,0.15),transparent_50%)]" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 lg:mb-12 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"
                        >
                            Projects
                        </motion.h1>

                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 lg:mb-12">
                            {filters.map((filter) => (
                                <motion.button
                                    key={filter.name}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleFilterClick(filter.name)}
                                    className={`px-2 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm md:text-base font-medium transition-colors
                                    ${activeFilter === filter.name
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                            : 'bg-gray-800/50 text-gray-400 hover:text-white'}`}
                                >
                                    {filter.label}
                                </motion.button>
                            ))}
                        </div>

                        <div className="relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    layout
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
                                >
                                    {currentProjects.map((project, index) => (
                                        <motion.div
                                            key={`${project.title}-${currentPage}-${index}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="w-full"
                                        >
                                            <ProjectCard {...project} />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>

                            {pageCount > 1 && (
                                <div className="flex justify-center mt-4 sm:mt-6 lg:mt-8 gap-2 sm:gap-3 md:gap-4">
                                    <motion.button
                                        whileHover={!isFirstPage ? { scale: 1.1 } : {}}
                                        whileTap={!isFirstPage ? { scale: 0.9 } : {}}
                                        onClick={prevPage}
                                        disabled={isFirstPage}
                                        className={`p-1 sm:p-1.5 md:p-2 rounded-full ${isFirstPage
                                            ? 'bg-gray-700/20 text-gray-600 cursor-not-allowed'
                                            : 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                                            }`}
                                    >
                                        <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={!isLastPage ? { scale: 1.1 } : {}}
                                        whileTap={!isLastPage ? { scale: 0.9 } : {}}
                                        onClick={nextPage}
                                        disabled={isLastPage}
                                        className={`p-1 sm:p-1.5 md:p-2 rounded-full ${isLastPage
                                            ? 'bg-gray-700/20 text-gray-600 cursor-not-allowed'
                                            : 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                                            }`}
                                    >
                                        <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                    </motion.button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
