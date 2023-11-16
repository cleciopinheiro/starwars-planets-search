import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import getApi from '../utils/fetchApi';

const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [options, setOptions] = useState(['Population', 'Rotation', 'Orbital', 'Diameter']);
  const [loading, setLoading] = useState(true);
  const [inputsValue, setInputsValue] = useState({
    search: '',
    column: 'Population',
    comparison: 'Menor que',
    value: 0,
    order: 'Population',
    sort: 'ASC',
  });

  useEffect(() => {
    setLoading(true);
    try {
      const fetchApi = async () => {
        const response = await getApi();
        setData(response);
        setLoading(false);
      };
      fetchApi();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);
  
  const value = useMemo(() => ({
    data,
    setData,
    filters,
    setFilters,
    options,
    setOptions,
    inputsValue,
    setInputsValue,
  }), [
    data,
    setData,
    filters,
    setFilters,
    options,
    setOptions,
    inputsValue,
    setInputsValue,
  
  ]);

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
