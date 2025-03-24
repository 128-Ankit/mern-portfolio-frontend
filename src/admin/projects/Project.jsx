import React, { useState, useEffect } from 'react';
import { getProjects, deleteProjects } from '../../api.js';
import { Link } from 'react-router-dom';
import Spinner from '../../components/common/Spinner.jsx';

const Project = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const data = await getProjects();
            setProjects(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await deleteProjects(id);
                fetchProjects(); // Refresh the list
            } catch (error) {
                console.error('Error deleting project:', error);
                alert('Failed to delete project');
            }
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-3 sm:p-4 md:p-6 lg:p-8">
            {loading ? (
                <div className="h-[60vh]">
                    <Spinner />
                </div>
            ) : (
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
                        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                            Projects
                        </h1>
                        <Link
                            to="/add-project"
                            className="w-full sm:w-auto py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded hover:opacity-90 transition-opacity text-center"
                        >
                            Add New Project 
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {projects.map((project) => (
                            <div key={project._id} className="bg-gray-900/50 rounded-lg p-4 sm:p-6 shadow-lg">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3 sm:mb-4"
                                />
                                <h2 className="text-lg sm:text-xl font-bold mb-2">{project.title}</h2>
                                <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">{project.description}</p>
                                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                                    {project.technologies.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-gray-800 rounded-full text-xs sm:text-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2 flex-col sm:flex-row">
                                    <Link
                                        to={`/edit-project/${project._id}`}
                                        className="flex-1 py-2 px-4 bg-blue-500 rounded text-center hover:bg-blue-600 transition-colors text-sm sm:text-base"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(project._id)}
                                        className="flex-1 py-2 px-4 bg-red-500 rounded hover:bg-red-600 transition-colors text-sm sm:text-base"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Project;
