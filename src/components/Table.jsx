import { useContext } from 'react';
import Context from '../context/Context';

function Table() {
  const { data, inputsValue } = useContext(Context);
  return (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Terrain</th>
        <th>Population</th>
        <th>Gravity</th>
        <th>Surface</th>
        <th>Diameter</th>
        <th>Orbital</th>
        <th>Rotation</th>
      </tr>
    </thead>
    <tbody>
      { data.filter((filter) => filter.name.toLowerCase().includes(inputsValue.search.toLowerCase()))
        .map((item) => (
          <tr key={ item.name }>
            <td>{ item.name }</td>
            <td>{ item.terrain }</td>
            <td>{ item.population }</td>
            <td>{ item.gravity }</td>
            <td>{ item.surface_water }</td>
            <td>{ item.diameter }</td>
            <td>{ item.orbital_period }</td>
            <td>{ item.rotation_period }</td>
          </tr>
        ))}
    </tbody>
  </table>
  );
}

export default Table;
