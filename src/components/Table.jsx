import React, { useContext, useEffect, useState } from 'react';
import context from '../contexts/MyContext';
import '../styles/Table.css';

export default function Table() {
  const { api, isLoading } = useContext(context);
  const [data, setData] = useState([]);
  const [nameFilter, setFilterName] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [compareFilter, setCompareFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);

  useEffect(() => {
    setData([...api]);
  }, [api]);

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

  const handleFilter = () => {
    switch (compareFilter) {
    case 'maior que':
      return setData(api
        .filter((item) => Number(item[columnFilter]) > Number(valueFilter)));
    case 'menor que':
      return setData(api
        .filter((item) => Number(item[columnFilter]) < Number(valueFilter)));
    case 'igual a':
      return setData(api
        .filter((item) => Number(item[columnFilter]) === Number(valueFilter)));
    default:
    }
  };

  return (
    <main>
      <form>
        <input
          name="filterName"
          type="text"
          onChange={ handleChange }
          data-testid="name-filter"
          placeholder="Nome do planeta"
        />
        <select
          name="columnFilter"
          data-testid="column-filter"
          value={ columnFilter }
          onChange={ handleChange }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
      </form>

      { isLoading && <p>Carregando...</p> }
      <table>
        <thead>
          <tr>
            <th>Climate</th>
            <th>Created</th>
            <th>Diameter</th>
            <th>Edited</th>
            <th>Films</th>
            <th>Gravity</th>
            <th>Name</th>
            <th>Orbital Period</th>
            <th>Population</th>
            <th>Rotation Period</th>
            <th>Surface Water</th>
            <th>Terrain</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          { data.filter((filter) => filter.name.toLowerCase().includes(nameFilter))
            .map((item) => (
              <tr key={ item.name }>
                <td>{ item.climate }</td>
                <td>{ item.created }</td>
                <td>{ item.diameter }</td>
                <td>{ item.edited }</td>
                <td>{ item.films }</td>
                <td>{ item.gravity }</td>
                <td>{ item.name }</td>
                <td>{ item.orbital_period }</td>
                <td>{ item.population }</td>
                <td>{ item.rotation_period }</td>
                <td>{ item.surface_water }</td>
                <td>{ item.terrain }</td>
                <td>{ item.url }</td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
}
