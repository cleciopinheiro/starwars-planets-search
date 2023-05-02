import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

export default function Provider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [api, setApi] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setIsLoading(true);
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      const newData = data.results;
      setApi(newData);
      console.log(newData);
    };
    fetchAPI();
    setIsLoading(false);
  }, []);

  const STATE = {
    api,
    isLoading,
  };

  return (
    <MyContext.Provider value={ STATE }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.string.isRequired,
};
