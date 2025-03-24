import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjects, updateProjects } from '../../api.js';
import { InputField, Textarea, Select } from './Common.jsx';
import Spinner from '../../components/common/Spinner.jsx';

const EditProject = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        technologies: '',
        github: '',
        live: '',
        category: 'frontend'
    });
    const [loading, setLoading] = useState(true);


    // categoryOptions
    const categoryOptions = [
        { value: 'frontend', label: 'Frontend' },
        { value: 'fullstack', label: 'Full Stack' },
        { value: 'ai', label: 'AI/ML' },
        { value: 'backend', label: 'Backend' },
        { value: 'other', label: 'Other' },
    ]

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const projects = await getProjects();
                const project = projects.find(p => p._id === id);
                if (project) {
                    setFormData({
                        title: project.title || '',
                        description: project.description || '',
                        image: project.image || '',
                        technologies: Array.isArray(project.technologies)
                            ? project.technologies.join(', ')
                            : '',
                        github: project.github || '',
                        live: project.live || '',
                        category: project.category || ''
                    });
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching project:', error);
                alert('Error loading project data');
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedData = {
                ...formData,
                technologies: formData.technologies.split(',').map(tech => tech.trim())
            };
            await updateProjects(id, updatedData);
            navigate('/admin-project');
        } catch (error) {
            console.error('Error updating project:', error);
            alert('Failed to update project');
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
            {loading ? (
                <div className="h-[60vh]">
                    <Spinner />
                </div>
            ) : (
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                        Edit Project
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <InputField
                            Title={"Title"}
                            type={"text"}
                            name={"title"}
                            value={formData.title}
                            onChange={handleChange}
                        />


                        <Textarea
                            Title={"Description"}
                            name={"description"}
                            value={formData.description}
                            onChange={handleChange}
                        />

                        <InputField
                            Title={"Image URL"}
                            type={"url"}
                            name={"image"}
                            value={formData.image}
                            onChange={handleChange}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <InputField
                                Title={"Demo Link"}
                                type={"url"}
                                name={"live"}
                                value={formData.live}
                                onChange={handleChange}
                            />

                            <InputField
                                Title={"Github Link"}
                                type={"url"}
                                name={"github"}
                                value={formData.github}
                                onChange={handleChange}
                            />
                        </div>

                        <Select
                            label="Category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            options={categoryOptions}
                            required
                        />

                        <InputField
                            Title={"Technologies (comma-separated)"}
                            type={"text"}
                            name={"technologies"}
                            value={formData.technologies}
                            onChange={handleChange}
                            placeholder={"React, Node.js, MongoDB"}
                        />
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="flex-1 py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded hover:opacity-90 transition-opacity"
                            >
                                Update Project
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/admin-project')}
                                className="flex-1 py-2 px-4 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div >
            )}
        </div >
    );
};

export default EditProject;
