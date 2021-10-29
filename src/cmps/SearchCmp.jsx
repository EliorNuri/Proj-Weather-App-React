import React from 'react';
import { BiSearchAlt } from "react-icons/bi";


function SearchCmp({handleSearch}) {

    function setSearch(e){
        if (e.keyCode === 13) {
            handleSearch(e.target.value)
        }
    }


    return (
        <div className="search-container flex row center">
            <span className="flex row center">
                <BiSearchAlt />
            </span>
            <input onKeyUp={(e) => setSearch(e)} placeholder="Search City ..."/>
        </div>
    )
}

export default SearchCmp
