import React, { useState, useEffect } from 'react';
import { getProjects, deleteProjects } from '../../api.js';
import { Link } from 'react-router-dom';

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
        <div className="min-h-screen bg-black text-white p-8">
            {loading ? (<div>Loading...</div>) : (
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                            Projects
                        </h1>
                        <Link
                            to="/add-project"
                            className="py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded hover:opacity-90 transition-opacity"
                        >
                            Add New Project
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <div key={project._id} className="bg-gray-900/50 rounded-lg p-6 shadow-lg">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <h2 className="text-xl font-bold mb-2">{project.title}</h2>
                                <p className="text-gray-400 mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-gray-800 rounded-full text-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <Link
                                        to={`/edit-project/${project._id}`}
                                        className="flex-1 py-2 px-4 bg-blue-500 rounded text-center hover:bg-blue-600 transition-colors"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(project._id)}
                                        className="flex-1 py-2 px-4 bg-red-500 rounded hover:bg-red-600 transition-colors"
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
