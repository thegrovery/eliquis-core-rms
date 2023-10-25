import React, { useState, useEffect } from 'react';
import './ProgressTracker.scss';

interface CheckboxProps {
    pageIndex: number;
    labelText?: string;  // <-- Added this line to include the optional labelText prop

}

const Checkbox: React.FC<CheckboxProps> = ({ pageIndex, labelText }) => {
    const [isChecked, setIsChecked] = useState<boolean>(() => {
        const readPages = localStorage.getItem('readPages');
        const storedPages = readPages ? JSON.parse(readPages) : [];
        return storedPages.includes(pageIndex);
    });
    
    const [forceUpdate, setForceUpdate] = useState(0); // Added this line

    const handleCheck = () => {
        setIsChecked(prev => !prev);

        const storedPages = localStorage.getItem('readPages');
        const readPages = storedPages ? JSON.parse(storedPages) : [];

        console.log('isChecked state:', isChecked);  // <-- Add this line
        console.log('readPages:', readPages);        // <-- Add this line

        if (readPages.includes(pageIndex)) {
            const newPages = readPages.filter((p: number) => p !== pageIndex);
            localStorage.setItem('readPages', JSON.stringify(newPages));
        } else {
            localStorage.setItem('readPages', JSON.stringify([...readPages, pageIndex]));
        }
        console.log('Local Storage after update:', localStorage.getItem('readPages'));  // <-- Add this line

        // After updating the localStorage in Checkbox
        const event = new Event('readPageUpdated');
        window.dispatchEvent(event);
    };

    


    useEffect(() => {
        const handleStorageChange = () => {
            setForceUpdate(prev => prev + 1); // This updates the state, forcing a re-render
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []); // This effect sets up the event listener for local storage changes

    return (
        <div className="checkbox-container">
            <input type="checkbox" id={`checkbox-${pageIndex}`} checked={isChecked} onChange={handleCheck} />
            <label htmlFor={`checkbox-${pageIndex}`}>
                {labelText || "Yes, I've read this content and want to continue on."}  {/* Use the labelText prop or the fallback text */}
            </label>
        </div>
    );
};

export default Checkbox;
