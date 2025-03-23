import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';


const ProjectCard = ({ title, description, technologies, image, github, live }) => (
    <motion.div
        layout
        className="bg-gray-900/50 rounded-xl overflow-hidden backdrop-blur-sm border border-gray-800"
    >
        <div className="relative group h-48 overflow-hidden">
            <img 
                src={image} 
                alt={title}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 flex gap-4">
                    {github && (
                        <a href={github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
                            <FaGithub size={24} />
                        </a>
                    )}
                    {live && (
                        <a href={live} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
                            <FaExternalLinkAlt size={24} />
                        </a>
                    )}
                </div>
            </div>
        </div>
        <div className="p-6">
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-300 mb-4">{description}</p>
            <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                    <span 
                        key={index}
                        className="px-3 py-1 text-sm rounded-full bg-blue-500/20 text-blue-300"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    </motion.div>
);

export default ProjectCard;