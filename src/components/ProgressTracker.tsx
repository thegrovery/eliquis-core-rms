import React, { useState, useEffect } from 'react';
import './ProgressTracker.scss';

const ProgressTracker: React.FC = () => {
    const [readPages, setReadPages] = useState<number[]>(() => {
        const storedPages = localStorage.getItem('readPages');
        return storedPages ? JSON.parse(storedPages) : [];
    });
    const [forceUpdate, setForceUpdate] = useState(0); // Added this line

    // Dynamic import of MDX files
    const mdxFiles = import.meta.glob('./../content/docs/en/program-in-practice/*.mdx');
    const totalPages = Object.keys(mdxFiles).length; // Determine total pages

    useEffect(() => {
        const handleStorageChange = () => {
            const storedPages = localStorage.getItem('readPages');
            const newReadPages = storedPages ? JSON.parse(storedPages) : [];
            setReadPages(newReadPages);
        };
    
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('readPageUpdated', handleStorageChange); // Listen for the custom event
    
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('readPageUpdated', handleStorageChange); // Cleanup
        };
    }, []);

    return (
        <div className="progress-tracker">
            <p>Progress: {readPages.length}/{totalPages}</p>
            {Array.from({ length: totalPages }).map((_, index) => (
                <span key={index} className={readPages.includes(index + 1) ? 'read' : ''}>
                    {readPages.includes(index + 1) ? '✔' : index + 1}
                </span>            
            ))}
        </div>
    );
};

export default ProgressTracker;
