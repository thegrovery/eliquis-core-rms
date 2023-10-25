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

    // Filter out the "index" page and determine total pages
    const validPages = Object.keys(mdxFiles).filter(page => !page.includes('index.mdx'));

    const totalPages = validPages.length;

    // Define the mapping of page order to their slugs (excluding 'index')
    const pageOrderToSlugMapping = [
        'about-program-in-practice',
        'how-1-855-eliquis-works',
        'provider-expresses-that-patient-is-concerned-about-high-out-of-pocket-costs',
        'provider-expresses-that-patient-unable-to-get-prescription-filled',
        'pharmacist-says-medicare-medicaid-dod-tricare-va-champus-patients-are-not-eligible-for-co-pay-assistance',
        'co-pay-backdate-request',
        'provider-expresses-that-patient-unaware-of-co-pay-program-andor-hasnt-been-using-co-pay-card',
        'mail-order-pharmacy',
        'e-sign',
        'digital-assistant'
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
                    {readPages.includes(index + 1) ? '✔' : index + 1}
                </span>
            </a>  
        ))}
    </div>
    );
};

export default ProgressTracker;
