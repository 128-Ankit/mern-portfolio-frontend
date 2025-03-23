import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SkillCard = ({ icon: Icon, title, description, color, editable, onEdit }) => {
    const [editedDescription, setEditedDescription] = useState(description);

    useEffect(() => {
        if (!editable) {
            setEditedDescription(description);
        }
    }, [editable, description]);

    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6"
        >
            <div className="flex items-start gap-4">
                <div 
                    className="p-3 rounded-lg"
                    style={{ background: `${color}22` }}
                >
                    <Icon className="text-2xl" style={{ color }} />
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    {editable ? (
                        <textarea
                            value={editedDescription}
                            onChange={(e) => {
                                setEditedDescription(e.target.value);
                                onEdit(e.target.value);
                            }}
                            className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-md resize-none focus:outline-none focus:border-blue-500"
                            rows="2"
                        />
                    ) : (
                        <p className="text-gray-400">{description}</p>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default SkillCard;