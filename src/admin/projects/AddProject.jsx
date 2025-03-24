import React, { useState } from 'react';
import { addProjects } from "../../api.js";
import { InputField, Textarea, Select } from './Common.jsx';

const AddProject = () => {
    const [projectData, setProjectData] = useState({
        title: '',
        description: '',
        image: '',
        live: '',
        github: '',
        category: 'frontend',
        technologies: ''
    });

    // Function for adding project
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Format technologies as array
        const formattedData = {
            ...projectData,
            technologies: projectData.technologies.split(',').map(tech => tech.trim())
        };

        // if response.ok
        const formData = setProjectData({
            title: '',
            description: '',
            image: '',
            live: '',
            github: '',
            category: 'frontend',
            technologies: ''
        })

        try {
            await addProjects(formattedData, formData);
        } catch (error) {
            console.error('Error adding project:', error);
            alert('Failed to add project');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // categoryOptions
    const categoryOptions = [
        { value: 'frontend', label: 'Frontend' },
        { value: 'fullstack', label: 'Full Stack' },
        { value: 'ai', label: 'AI/ML' },
        { value: 'backend', label: 'Backend' },
        { value: 'other', label: 'Other' },
    ]

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-2xl mx-auto bg-gray-900/50 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                    Add New Project
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                   
                    <InputField
                        Title={"Title"}
                        type={"text"}
                        name={"title"}
                        value={projectData.title}
                        onChange={handleChange}
                    />


                    <Textarea
                        Title={"Description"}
                        name={"description"}
                        value={projectData.description}
                        onChange={handleChange}
                    />

                    <InputField
                        Title={"Image URL"}
                        type={"url"}
                        name={"image"}
                        value={projectData.image}
                        onChange={handleChange}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <InputField
                            Title={"Demo Link"}
                            type={"url"}
                            name={"live"}
                            value={projectData.live}
                            onChange={handleChange}
                        />

                        <InputField
                            Title={"Github Link"}
                            type={"url"}
                            name={"github"}
                            value={projectData.github}
                            onChange={handleChange}
                        />
                    </div>

                    <Select
                        label="Category"
                        name="category"
                        value={projectData.category}
                        onChange={handleChange}
                        options={categoryOptions}
                        required
                    />

                    <InputField
                        Title={"Technologies (comma-separated)"}
                        type={"text"}
                        name={"technologies"}
                        value={projectData.technologies}
                        onChange={handleChange}
                        placeholder={"React, Node.js, MongoDB"}
                    />
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded hover:opacity-90 transition-opacity"
                    >
                        Add Project
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProject;
