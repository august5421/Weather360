import React from 'react';
import './screens.css';
import AutocompleteSearchBar from '../components/AutocompletelSearchBar';

const SearchScreen = ({ onLocationChange, darkMode  }) => {

  return (
    <div className={"SearchScreen " + (darkMode ? "blue" : "lightBlue")}>
      <AutocompleteSearchBar onLocationChange={onLocationChange}/>
    </div>
  );
};

export default SearchScreen;
