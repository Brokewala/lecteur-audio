import React from 'react';
import "./search.scss";

const Search = ({setSearchValue,searchValue,handleSearch}) => {

    return (
        <div className="Search">
            <input 
                onChange={(e)=>setSearchValue(e.target.value)}
                value={searchValue}
                type="search" 
                placeholder='Search ...' />
            <button onClick={handleSearch}>
                <i className="fa fa-search"></i>
            </button>
        </div>
    );
}

export default Search;
