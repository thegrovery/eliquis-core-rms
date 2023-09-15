import { useState, useEffect, useRef } from 'preact/hooks';
import algoliasearch from 'algoliasearch/lite';
// import Modal from './Modal'; // Import the Modal component
import './SimpleSearch.scss';

interface SimpleSearchProps {
    onClose: () => void;
  }
  

const Search = ({ onClose }: SimpleSearchProps) => {
    const [query, setQuery] = useState('');
    const [hits, setHits] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const modalContentRef = useRef(null);

    const searchClient = algoliasearch('7CDE1498H2', '559f06160d974e0a17e99a6f8de4f5c0');
    const index = searchClient.initIndex('core_rms');

    const [recentSearches, setRecentSearches] = useState(() => {
        return JSON.parse(localStorage.getItem('recentSearches') || '[]');
    });

    const saveSearchToRecent = (title: string, url: string) => {
        const newRecentSearch = { title, url };
        const newRecentSearches = [newRecentSearch, ...recentSearches].filter((item, index, self) => 
            index === self.findIndex((t) => (t.title === item.title && t.url === item.url))
        ).slice(0, 5);
        setRecentSearches(newRecentSearches);
        localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
    };
    
    const handleLinkClick = (title: string, url: string) => {
        console.log("handleLinkClick - Storing to recent:", title, url);  // Debugging line
        saveSearchToRecent(title, url);
    };
    
    const unselectedStar = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20.728" height="19.786" viewBox="0 0 20.728 19.786">
            <path id="Icon_feather-star" data-name="Icon feather-star" d="M12.614,3l2.971,6.018,6.643.971-4.807,4.682,1.134,6.615-5.942-3.125L6.673,21.286l1.134-6.615L3,9.989l6.643-.971Z" transform="translate(-2.25 -2.25)" fill="none" stroke="#adadad" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
        </svg>
    );
    
    const selectedStar = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20.728" height="19.786" viewBox="0 0 20.728 19.786">
            <path id="Icon_feather-star" data-name="Icon feather-star" d="M12.614,3l2.971,6.018,6.643.971-4.807,4.682,1.134,6.615-5.942-3.125L6.673,21.286l1.134-6.615L3,9.989l6.643-.971Z" transform="translate(-2.25 -2.25)" fill="#81c051" stroke="#81c051" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
        </svg>
    );

    const [favorites, setFavorites] = useState(() => {
        return JSON.parse(localStorage.getItem('favorites') || '[]');
    });

    const toggleFavorite = (title: string, url: string) => {
        console.log("toggleFavorite - Toggling favorite:", title, url);
        if (favorites.some(fav => fav.title === title)) {
            // Remove from favorites
            const newFavorites = favorites.filter(fav => fav.title !== title);
            setFavorites(newFavorites);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
        } else {
            // Add to favorites
            const newFavorites = [{title, url}, ...favorites];
            setFavorites(newFavorites);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
        }
    };
    

    useEffect(() => {
        if (query.length > 1) {
            handleSearch();
        } else {
            setHits([]);
        }
    }, [query]);

    const handleSearch = async () => {
        try {
            const results = await index.search(query);
            setHits(results.hits);
        } catch (error) {
            console.error('Error searching:', error);
            setErrorMessage('An error occurred while searching. Please try again.');
        }
    };

    const deleteRecentSearch = (title: string) => {
        const newRecentSearches = recentSearches.filter(item => item.title !== title);
        setRecentSearches(newRecentSearches);
        localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
    };

    const filteredRecentSearches = recentSearches.filter(item => !favorites.some(fav => fav.title === item.title));

    const displayFavorites = favorites.map(item => (
        <li class='simpleSearch_item recent'>
            <span 
                onClick={() => toggleFavorite(item.title, item.url)}
                class='favoriteToggle'
            >
                {favorites.some(fav => fav.title === item.title) ? selectedStar : unselectedStar}
            </span>
            <a class='full-link' href={item.url} onClick={() => handleLinkClick(item.title, item.url)}>
                {item.title}
            </a>
        </li>
    ));
    
    const displayRecent = filteredRecentSearches.map(item => (
        <li class='simpleSearch_item recent'>
            <span 
                onClick={() => toggleFavorite(item.title, item.url)}
                class='favoriteToggle'
            >
            {favorites.some(fav => fav.title === item.title) ? selectedStar : unselectedStar}
            </span>
            <a class='full-link' href={item.url} onClick={() => handleLinkClick(item.title, item.url)}>
                {item.title}
            </a>
            {/* Adding a delete button here */}
            <button class='remove' onClick={() => deleteRecentSearch(item.title)}> × </button>
        </li>
    ));

    
    
    


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalContentRef.current && !modalContentRef.current.contains(e.target)) {
                setIsModalOpen(false);
            }
        };

        const handleEscapeKey = (e) => {
            if (e.key === 'Escape') {
                setIsModalOpen(false);
            }
        };

        window.addEventListener('click', handleClickOutside);
        window.addEventListener('keydown', handleEscapeKey);

        return () => {
            window.removeEventListener('click', handleClickOutside);
            window.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    return (
        <div className='simpleSearch_wrap'  onClick={() => setIsModalOpen(true)}>
            
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" focusable="false" aria-hidden="true" role="img" class="astro-F4DDINW2">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(-1)" class="astro-F4DDINW2"></path>
            </svg>

            <button>Search</button>
            {isModalOpen && (
                <div class='simpleSearch_bg'>
                    <div className="simpleSearch" ref={modalContentRef}>
                        {errorMessage && <div>{errorMessage}</div>}
                        <input 
                            type="text" 
                            value={query} 
                            onChange={e => setQuery(e.target.value)} 
                            placeholder="Search..."
                        />
                        <ul class='simpleSearch_ul'>
                            {favorites.length > 0 && <li><h2>Favorites</h2></li>}
                            {displayFavorites}

                            {/* Only show the "Recent" heading if filteredRecentSearches has items */}
                            {filteredRecentSearches.length > 0 && <li><h2>Recent</h2></li>}
                            {displayRecent}
                            
                            {hits.length > 0 && <li><h2>Results</h2></li>}
                            {hits.map(hit => (
                                <li class='simpleSearch_item'>
                                    <span 
                                        onClick={() => toggleFavorite(hit.title, hit.url)}
                                        class='favoriteToggle'
                                    >
                                        {favorites.some(fav => fav.title === hit.title) ? selectedStar : unselectedStar}
                                    </span>
                                    <a class='full-link' href={hit.url} onClick={() => handleLinkClick(hit.title, hit.url)}>
                                        {hit.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <button class='simpleSearch_close' onClick={() => setIsModalOpen(false)}>
                            ×
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;
