import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaUserCog } from 'react-icons/fa';
import ProjectCard from '../components/Project/ProjectCard';
import { getProjects } from "../api.js"
import { useNavigate } from 'react-router-dom'


const Projects = () => {
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
                const response = await getProjects();
                setProjects(response);
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
        <div className="min-h-screen relative bg-black text-white p-8">
            {/* admin icon */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/admin-project')}
                className={`${isAdmin ? "absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-800/50 text-gray-400 hover:text-white" : "hidden"}`}
            >
                <FaUserCog size={24} />
            </motion.button>

            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(100,100,255,0.15),transparent_50%)]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"
                >
                    Projects
                </motion.h1>

                <div className="flex justify-center gap-4 mb-12">
                    {filters.map((filter) => (
                        <motion.button
                            key={filter.name}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleFilterClick(filter.name)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
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
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {currentProjects.map((project, index) => (
                                <motion.div
                                    key={`${project.title}-${currentPage}-${index}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <ProjectCard {...project} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {pageCount > 1 && (
                        <div className="flex justify-center mt-8 gap-4">
                            <motion.button
                                whileHover={!isFirstPage ? { scale: 1.1 } : {}}
                                whileTap={!isFirstPage ? { scale: 0.9 } : {}}
                                onClick={prevPage}
                                disabled={isFirstPage}
                                className={`p-2 rounded-full ${isFirstPage
                                    ? 'bg-gray-700/20 text-gray-600 cursor-not-allowed'
                                    : 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                                    }`}
                            >
                                <FaChevronLeft size={24} />
                            </motion.button>
                            <motion.button
                                whileHover={!isLastPage ? { scale: 1.1 } : {}}
                                whileTap={!isLastPage ? { scale: 0.9 } : {}}
                                onClick={nextPage}
                                disabled={isLastPage}
                                className={`p-2 rounded-full ${isLastPage
                                    ? 'bg-gray-700/20 text-gray-600 cursor-not-allowed'
                                    : 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                                    }`}
                            >
                                <FaChevronRight size={24} />
                            </motion.button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Projects;
