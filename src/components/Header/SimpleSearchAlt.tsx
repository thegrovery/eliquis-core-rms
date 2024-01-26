import { useState, useEffect } from 'preact/hooks';
import algoliasearch from 'algoliasearch/lite';

const Search = () => {
    
    const [query, setQuery] = useState('');
    const [hits, setHits] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    const searchClient = algoliasearch('2GVEXS0MRV', '8fea0ba951ba77e336ffa5ab144f0ecd');
    const index = searchClient.initIndex('core-eliquis-new');

    // Function to clear the query
    const clearQuery = () => {
        setQuery('');
    };

    const [recentSearches, setRecentSearches] = useState(() => {
        return JSON.parse(localStorage.getItem('recentSearches') || '[]');
    });

    const saveSearchToRecent = (title: string, url: string, folder: string) => {
        const newRecentSearch = { title, url, folder };
        const newRecentSearches = [newRecentSearch, ...recentSearches].filter((item, index, self) => 
            index === self.findIndex((t) => (t.title === item.title && t.url === item.url))
        ).slice(0, 5);
        setRecentSearches(newRecentSearches);
        localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));

        try {
            //Fire event
            window.dataLayer = window.dataLayer || [];
            dataLayer.push({
                'event':                    'GAEvent',
                'eventCategory':    'Search',
                'eventAction':          'Typing',
                'eventLabel':           'searchTerm-['+title+']',
                'eventValue':           'undefined',
                //'userEmail':                userEmail,
                //'userGroup':                userGroup,
            });

        } catch (e) {
            console.log("GA Event Error: " + e);
        }
    };
    
    const handleLinkClick = (title: string, url: string, folder: string) => {
        saveSearchToRecent(title, url, folder);

        try {
            //Fire event
            window.dataLayer = window.dataLayer || [];
            dataLayer.push({
                'event':                    'GAEvent',
                'eventCategory':    'Search',
                'eventAction':          'Click',
                'eventLabel':           'searchLinkClick-['+title+']',
                'eventValue':           'undefined',
                //'userEmail':                userEmail,
                //'userGroup':                userGroup,
            });

        } catch (e) {
            console.log("GA Event Error: " + e);
        }
    };

    const highlightText = (text, highlight) => {
        let parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <span>
                {parts.map((part, i) =>
                i % 2 === 0
                    ? part
                    : <span style={{ textDecoration: 'underline', backgroundColor: 'var(--custom-orange-50)' }}>{part}</span>
                )}
            </span>
        );
    };
    
    const unselectedStar = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20.728" height="19.786" viewBox="0 0 20.728 19.786">
            <path id="Icon_feather-star" data-name="Icon feather-star" d="M12.614,3l2.971,6.018,6.643.971-4.807,4.682,1.134,6.615-5.942-3.125L6.673,21.286l1.134-6.615L3,9.989l6.643-.971Z" transform="translate(-2.25 -2.25)" fill="none" stroke="var(--theme-accent-tertiary)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
        </svg>
    );
    
    const selectedStar = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20.728" height="19.786" viewBox="0 0 20.728 19.786">
            <path id="Icon_feather-star" data-name="Icon feather-star" d="M12.614,3l2.971,6.018,6.643.971-4.807,4.682,1.134,6.615-5.942-3.125L6.673,21.286l1.134-6.615L3,9.989l6.643-.971Z" transform="translate(-2.25 -2.25)" fill="var(--theme-accent-tertiary)" stroke="var(--theme-accent-tertiary)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
        </svg>
    );

    const [favorites, setFavorites] = useState(() => {
        return JSON.parse(localStorage.getItem('favorites') || '[]');
    });

    const toggleFavorite = (title: string, url: string, folder: string) => {
        if (favorites.some(fav => fav.title === title)) {
            const newFavorites = favorites.filter(fav => fav.title !== title);
            setFavorites(newFavorites);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
           //Unfavorite
           try {
               //Fire event
               window.dataLayer = window.dataLayer || [];
               dataLayer.push({
                   'event':                    'GAEvent',
                   'eventCategory':    'Search',
                   'eventAction':          'Click',
                   'eventLabel':           'searchUnfavorite-['+title+']',
                   'eventValue':           'undefined',
                   //'userEmail':                userEmail,
                   //'userGroup':                userGroup,
               });

           } catch (e) {
               console.log("GA Event Error: " + e);
           }
        } else {
            const newFavorites = [{title, url, folder}, ...favorites];
            setFavorites(newFavorites);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            //Favorite
            try {
                //Fire event
                window.dataLayer = window.dataLayer || [];
                dataLayer.push({
                    'event':                    'GAEvent',
                    'eventCategory':    'Search',
                    'eventAction':          'Click',
                    'eventLabel':           'searchFavorite-['+title+']',
                    'eventValue':           'undefined',
                    //'userEmail':                userEmail,
                    //'userGroup':                userGroup,
                });

            } catch (e) {
                console.log("GA Event Error: " + e);
            }
            
        }
    };

    useEffect(() => {
        if (query.length > 0) {
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
        <li class='simpleSearch_item recent fadeIn'>
            <span 
                onClick={() => toggleFavorite(item.title, item.url, item.folder)}
                class='favoriteToggle'
            >
                {favorites.some(fav => fav.title === item.title) ? selectedStar : unselectedStar}
            </span>
            <a class='full-link' href={item.url} onClick={() => handleLinkClick(item.title, item.url, item.folder)}>
                <div className='hit-folder'>
                    {item.folder && item.folder !== '.' ? item.folder : ''}
                </div>
                {item.title}
            </a>
        </li>
    ));
    
    const displayRecent = filteredRecentSearches.map(item => (
        <li class='simpleSearch_item recent'>
            <span 
                onClick={() => toggleFavorite(item.title, item.url, item.folder)}
                class='favoriteToggle'
            >
            {favorites.some(fav => fav.title === item.title) ? selectedStar : unselectedStar}
            </span>
            <a class='full-link' href={item.url} onClick={() => handleLinkClick(item.title, item.url, item.folder)}>
                <div className='hit-folder'>
                    {item.folder && item.folder !== '.' ? item.folder : ''}
                </div>
                {item.title}
            </a>
            {/* Adding a delete button here */}
            <button class='remove' onClick={() => deleteRecentSearch(item.title)}> × </button>
        </li>
    ));
    return (
        <div className="simpleSearch">
            <div className="inputWrapper">
                <input 
                    type="text" 
                    id="searchInput"
                    value={query} 
                    onInput={e => setQuery(e.target.value)} 
                    placeholder="Search..."
                />
                {query && <button className="clearButton" onClick={clearQuery}>×</button>}
            </div>
            <ul className='simpleSearch_ul'>
                {favorites.length > 0 && <li><h2>Favorites</h2></li>}
                {displayFavorites}
                {hits.length > 0 && <li><h2>Results</h2></li>}
                {hits
                    .filter(hit => !hit.title.toLowerCase().includes('index')) // Add more conditions if needed
                    .map(hit => (
                        <li className='simpleSearch_item fadeIn '>
                            <span 
                                onClick={() => toggleFavorite(hit.title, hit.url, hit.folder)}
                                className='favoriteToggle'
                            >
                                {favorites.some(fav => fav.title === hit.title) ? selectedStar : unselectedStar}
                            </span>
                            <a className='full-link' href={hit.url} onClick={() => handleLinkClick(hit.title, hit.url, hit.folder)}>
                                <div className='hit-folder'>
                                    {hit.folder && hit.folder !== '.' ? hit.folder : ''}
                                </div>
                                {highlightText(hit.title, query)}
                            </a>
                        </li>
                ))}
                {filteredRecentSearches.length > 0 && <li><h2>Recent</h2></li>}
                {displayRecent}
            </ul>
            {hits.length === 0 && filteredRecentSearches.length === 0 && favorites.length === 0 && (
                <div className="noResultsMessage">
                    No recent searches to display. Start typing to search instantly.
                </div>
            )}
        </div>
    );
};

export default Search;