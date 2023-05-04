import React, { useContext } from 'react';
import './App.css';
import Table from './components/Table';
import Header from './components/Header';
import Filters from './components/Filters';
import context from './contexts/MyContext';

function App() {
  const { isLoading } = useContext(context);
  return (
    <main>
      <Header />
      <Filters />
      { isLoading && <p>Carregando...</p> }
      <Table />
    </main>
  );
}

export default App;
