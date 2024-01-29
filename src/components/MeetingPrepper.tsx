import React, { useState, useEffect } from 'react';
import './ProgressTracker.scss';

const ProgressTracker: React.FC = () => {
    const [readPages, setReadPages] = useState<number[]>(() => {
        const storedPages = localStorage.getItem('readPages');
        return storedPages ? JSON.parse(storedPages) : [];
    });
    const [forceUpdate, setForceUpdate] = useState(0); // Added this line

    // Dynamic import of MDX files
    const mdxFiles = import.meta.glob('./../content/docs/en/meeting-prep/*.mdx');

    // Filter out the "index" page and determine total pages
    const validPages = Object.keys(mdxFiles).filter(page => !page.includes('index.mdx'));

    const totalPages = validPages.length;

    // Define the mapping of page order to their slugs (excluding 'index')
    const pageOrderToSlugMapping = [
        'asco-conference'
        
    ];


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
            <a href={`/program-in-practice/${pageOrderToSlugMapping[index]}`} key={index}>
                <span className={readPages.includes(index + 1) ? 'read' : ''}>
                    {readPages.includes(index + 1) ? <svg xmlns="http://www.w3.org/2000/svg" width="19.303" height="13.741" viewBox="0 0 19.303 13.741">
<path id="Icon_feather-check" data-name="Icon feather-check" d="M22.475,9,11.148,20.326,6,15.178" transform="translate(-4.586 -7.586)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
</svg>
 : index + 1}
                </span>
            </a>  
        ))}
    </div>
    );
};

export default ProgressTracker;
