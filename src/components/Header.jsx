import React, { useContext } from 'react';
import context from '../contexts/MyContext';

export default function Header() {
  const { setFilterName } = useContext(context);

  return (
    <main>
      <h1>STARWARS</h1>
      <input
        name="filterName"
        type="text"
        onChange={ ({ target }) => setFilterName(target.value) }
        data-testid="name-filter"
        placeholder="Nome do planeta"
      />
    </main>
  );
}
