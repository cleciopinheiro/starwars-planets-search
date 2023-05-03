import React from 'react';
import './App.css';
import Table from './components/Table';
import Header from './components/Header';
import Filters from './components/Filters';

function App() {
  return (
    <main>
      <Header />
      <Filters />
      <Table />
    </main>
  );
}

export default App;
