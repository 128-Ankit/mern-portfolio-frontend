import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { getAbout, updateAbout } from '../../api';
import { FaEdit } from 'react-icons/fa';
import Spinner from '../common/Spinner';

const Profile = () => {
    const [token] = useState(localStorage.getItem('authToken'));
    const [about, setAbout] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [id, setId] = useState(null);
    const [error, setError] = useState(null);

    const [descreiption, setDescreiption] = useState('');
    const [imageURL, setImageURL] = useState('');

    // Get About data
    useEffect(() => {
        const fetchAbout = async () => {
            try {
                setLoading(true);
                setError(null); // Reset error state
                const data = await getAbout();
                setAbout(data);
                setId(data[0]._id)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAbout();
    }, []);
    
    if (error) return <div>Error: {error}</div>;
    if (!about || !about[0]) return <div>No data available</div>;
    
    const profileData = about[0];
   
    // Update about
    const handleEdit = () => {
        setIsEditing(true);
        setDescreiption(profileData.descreiption);
        setImageURL(profileData.imageURL);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                descreiption,
                imageURL,
                id
            };
            await updateAbout(data);
            setAbout([{ ...profileData, descreiption, imageURL }]);
            setIsEditing(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setDescreiption(profileData.descreiption);
        setImageURL(profileData.imageURL);
    };

    return (
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto mt-12 relative">
            {token && (
                <div className="absolute top-0 right-0 space-x-3">
                    {!isEditing && (
                        <>
                            <button 
                                onClick={handleEdit}
                                className="p-2 text-blue-500 hover:text-blue-600 transition-colors"
                                title="Edit"
                            >
                                <FaEdit size={20} />
                            </button>
                        </>
                    )}
                </div>
            )}
            
            {isEditing ? (
                <form onSubmit={handleSubmit} className="w-full max-w-4xl space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400">Image URL</label>
                        <input
                            type="text"
                            value={imageURL}
                            onChange={(e) => setImageURL(e.target.value)}
                            className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400">Description</label>
                        <textarea
                            value={descreiption}
                            onChange={(e) => setDescreiption(e.target.value)}
                            className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white h-32"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                        >
                            Save
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <motion.div
                            animate={{
                                background: [
                                    "linear-gradient(to right, #3b82f6, #8b5cf6)",
                                    "linear-gradient(to right, #8b5cf6, #3b82f6)",
                                ],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                            className="absolute -inset-1 rounded-full blur-md"
                        />
                        <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-white/10">
                            <img
                                src={profileData.imageURL}
                                alt={"Ankit Pathak"}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="text-xl text-gray-400 max-w-2xl text-left"
                    >
                        {profileData.descreiption}
                    </motion.p>
                </>
            )}
        </div>
    );
};

export default Profile;