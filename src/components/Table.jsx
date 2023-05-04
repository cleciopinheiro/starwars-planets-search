import React, { useContext, useEffect } from 'react';
import context from '../contexts/MyContext';
import '../styles/Table.css';

export default function Table() {
  const { api, data, options, setData, setColumnFilter,
    nameFilter } = useContext(context);

  useEffect(() => {
    setData(api);
  }, [api, setData]);

  useEffect(() => {
    setColumnFilter(options[0]);
  }, [options, setColumnFilter]);

  return (
    <main>
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
