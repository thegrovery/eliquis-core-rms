import React, { useState, useEffect } from 'react';
import './ProgressTracker.scss';

interface CheckboxProps {
    pageIndex: number;
    labelText?: string;  // optional labelText prop
    navLock?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ pageIndex, labelText, navLock }) => {
    const [isChecked, setIsChecked] = useState<boolean>(() => {
        const readPages = localStorage.getItem('readPages');
        const storedPages = readPages ? JSON.parse(readPages) : [];
        console.log(storedPages);
        return storedPages.includes(pageIndex);
    });
    
    const [forceUpdate, setForceUpdate] = useState(0); // Added this line

    const handleCheck = () => {
        setIsChecked(prev => !prev);

        const storedPages = localStorage.getItem('readPages');
        const readPages = storedPages ? JSON.parse(storedPages) : [];

        console.log('isChecked state:', isChecked);  // <-- log state
        console.log('readPages:', readPages);        // <-- log readPages

        if (readPages.includes(pageIndex)) {
            const newPages = readPages.filter((p: number) => p !== pageIndex);
            localStorage.setItem('readPages', JSON.stringify(newPages));
            console.log("item update 1");
        } else {
            localStorage.setItem('readPages', JSON.stringify([...readPages, pageIndex]));
            console.log("item update 2");
        }
        console.log('Local Storage after update:', localStorage.getItem('readPages'));  // log after state

        // After updating the localStorage in Checkbox
        const event = new Event('readPageUpdated');
        window.dispatchEvent(event);

        //Unlock 'next' article nav button
        var navButton = document.querySelector("[data-locked][rel='next']");
        if(isChecked == true){
            console.log("checkbox unchecked");
            navButton.setAttribute("data-locked","true");
        }else{
            console.log("checkbox checked");
            navButton.setAttribute("data-locked","false");
        }
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
        <div className="checkbox-container progressTrackerCheckbox" data-progress-tracker={navLock}>
            <input type="checkbox" id={`checkbox-${pageIndex}`} checked={isChecked} onChange={handleCheck} />
            <label htmlFor={`checkbox-${pageIndex}`}>
                {labelText || "Yes, I've read this content and want to continue on."}  {/* Use the labelText prop or the fallback text */}
            </label>
        </div>
    );
};

export default Checkbox;
