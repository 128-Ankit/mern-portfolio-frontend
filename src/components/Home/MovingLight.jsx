import { useState, useEffect } from "react";

const MovingLight = () => {
    const [lightPos, setLightPos] = useState([0, 2, 2]);

    useEffect(() => {
        const handleMouseMove = (event) => {
            const { clientX, clientY } = event;
            const x = (clientX / window.innerWidth) * 4 - 2;
            const y = (clientY / window.innerHeight) * 4 - 2;
            setLightPos([x, -y, 2]);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            <pointLight position={lightPos} intensity={1} color="#4D79FF" />
            <pointLight position={[-2, 0, -2]} intensity={0.8} color="#FF4D4D" />
            <pointLight position={[2, -2, 0]} intensity={0.8} color="#4DFFFF" />
            <pointLight position={[0, 2, -2]} intensity={0.8} color="#FFD700" />
            <hemisphereLight intensity={0.3} groundColor="#000000" />
        </>
    );
};

export default MovingLight;