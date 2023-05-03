import React, { useEffect, useMemo, useState } from 'react';
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
    };
    fetchAPI();
    setIsLoading(false);
  }, []);

  const values = useMemo(() => ({
    api,
    isLoading,
  }), [api, isLoading]);

  return (
    <MyContext.Provider value={ values }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
