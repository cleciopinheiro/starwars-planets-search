import React, { useCallback, useContext } from 'react';
import context from '../contexts/MyContext';

export default function Filters() {
  const { columnFilter, compareFilter, valueFilter, setColumnFilter, setValueFilter,
    options, filters, api, data, setData, setCompareFilter,
    setOptions, setFilters, setFilterName } = useContext(context);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
    case 'filterName':
      return setFilterName(value);
    case 'columnFilter':
      return setColumnFilter(value);
    case 'compareFilter':
      return setCompareFilter(value);
    case 'valueFilter':
      return setValueFilter(value);
    default:
    }
  };

  const handleDeleteFilters = () => {
    setFilters([]);
    setData([...api]);
    setOptions(['population', 'orbital_period', 'diameter',
      'rotation_period', 'surface_water']);
  };

  const handleDeleteOption = useCallback((column) => {
    const filtered = filters.map((map) => map)
      .filter((filter) => filter.columnFilter !== column);
    setFilters([...filtered]);
    options.push(column);

    let newData = [...api];

    filtered.forEach((filter) => {
      if (filter.compareFilter === 'maior que') {
        newData = newData
          .filter((item) => Number(item[filter.columnFilter])
          > Number(filter.valueFilter));
      }

      if (filter.compareFilter === 'menor que') {
        newData = newData
          .filter((item) => Number(item[filter.columnFilter])
          < Number(filter.valueFilter));
      }

      if (filter.compareFilter === '') {
        newData = newData
          .filter((item) => Number(item[filter.columnFilter])
          === Number(filter.valueFilter));
      }
    });

    setData([...newData]);
  }, [options, filters, api, setData, setFilters]);

  const handleFilter = () => {
    setOptions(options.filter((option) => option !== columnFilter));
    switch (compareFilter) {
    case 'maior que':
      return (
        setData(data
          .filter((item) => Number(item[columnFilter]) > Number(valueFilter))),
        setFilters([...filters,
          { columnFilter, compareFilter, valueFilter }])
      );
    case 'menor que':
      return (
        setData(data
          .filter((item) => Number(item[columnFilter]) < Number(valueFilter))),
        setFilters([...filters,
          { columnFilter, compareFilter, valueFilter }])
      );
    case 'igual a':
      return (
        setData(data
          .filter((item) => Number(item[columnFilter]) === Number(valueFilter))),
        setFilters([...filters,
          { columnFilter, compareFilter, valueFilter }])
      );
    default:
    }
  };

  return (
    <form>
      <select
        name="columnFilter"
        data-testid="column-filter"
        value={ columnFilter }
        onChange={ handleChange }
      >
        {
          options.map((option) => (
            <option key={ option } value={ option }>{ option }</option>
          ))
        }
      </select>

      <select
        name="compareFilter"
        data-testid="comparison-filter"
        value={ compareFilter }
        onChange={ handleChange }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        onChange={ handleChange }
        value={ valueFilter }
        name="valueFilter"
        placeholder="0"
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleFilter }
      >
        Filtrar
      </button>

      <select
        name="columnFilter"
        data-testid="column-sort"
        value={ columnFilter }
        onChange={ handleChange }
      >
        {
          options.map((option) => (
            <option key={ option } value={ option }>{ option }</option>
          ))
        }
      </select>

      <div name="radio" value="">
        <label htmlFor="ascendent">
          Ascendant
          <input
            data-testid="column-sort-input-asc"
            type="radio"
            name="radio"
            value="ASC"
            id="ascendent"
          />
        </label>
        <label htmlFor="descendent">
          Descendant
          <input
            data-testid="column-sort-input-asc"
            type="radio"
            name="radio"
            value="DESC"
            id="descendent"
          />
        </label>
      </div>

      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ handleDeleteFilters }
      >
        Remover Filtros
      </button>

      {filters.length > 0 && filters.map((filter) => (
        <span data-testid="filter" key={ filter.columnFilter }>
          {`${filter.columnFilter} ${filter.compareFilter} ${filter.valueFilter}`}
          <button
            onClick={ () => handleDeleteOption(filter.columnFilter) }
            type="button"
          >
            Excluir
          </button>
        </span>
      ))}
    </form>
  );
}
