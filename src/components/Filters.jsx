import { useContext } from 'react';
import Button from './Button';
import RadioInput from './RadioInput';
import SearchInput from './SearchInput';
import SelectInput from './SelectInput';
import { GoSearch } from "react-icons/go";
import { VscError } from "react-icons/vsc";
import Context from '../context/Context';

function Filters() {
  const { options, inputsValue, setInputsValue } = useContext(Context);

  const handleSearch = () => {
    console.log('Buscar');
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setInputsValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFilter = () => {
    console.log('Filtrar');
  };

  const handleOrder = () => {
    console.log('Ordenar');
  };

  return (
    <div className='filter-container'>
      <div className='search'>
        <SearchInput value={ inputsValue.search } name='search' onChange={ (e) => handleChange(e) } />
        <GoSearch onClick={ handleSearch } size={32} color='white' className='search-button' />
      </div>
      <div className='filters'>
        <SelectInput options={ options } name='column' id='column' value={ inputsValue.column } onChange={ (e) => handleChange(e) } />
        <SelectInput options={['Menor que', 'Maior que', 'Igual a']} value={ inputsValue.comparison } name='comparison' id='comparison' onChange={ (e) => handleChange(e) } />
        <input type="number" name='value' value={ inputsValue.value } onChange={ (e) => handleChange(e) } />
        <Button value='Filter' onClick={ handleFilter } />
        <SelectInput options={ options } value={ inputsValue.order } name='order' id='order' onChange={ (e) => handleChange(e) } />
        <RadioInput name='sort' id='sort' value='ASC' defaultChecked onChange={ (e) => handleChange(e) } />
        <RadioInput name='sort' id='sort' value='DESC' onChange={ (e) => handleChange(e) } />
        <Button value='Order' onClick={ handleOrder } />
      </div>
    </div>
  );
}

export default Filters;
