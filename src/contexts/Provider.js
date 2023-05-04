import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

export default function Provider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [api, setApi] = useState([]);
  const [nameFilter, setFilterName] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [compareFilter, setCompareFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [data, setData] = useState([]);
  const [options, setOptions] = useState(['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water']);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchAPI = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const dataApi = await response.json();
      const newData = dataApi.results;
      setApi(newData);
      setIsLoading(false);
    };
    fetchAPI();
  }, []);

  const values = useMemo(() => ({
    api,
    isLoading,
    nameFilter,
    setFilterName,
    columnFilter,
    setColumnFilter,
    compareFilter,
    setCompareFilter,
    valueFilter,
    setValueFilter,
    data,
    setData,
    filters,
    setFilters,
    options,
    setOptions,
  }), [api, isLoading, nameFilter, setFilterName, columnFilter, data, setData, filters,
    setFilters, setColumnFilter, compareFilter, setCompareFilter,
    valueFilter, setValueFilter, options, setOptions]);

  return (
    <MyContext.Provider value={ values }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
