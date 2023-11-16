function SearchInput(props) {
  return (
    <input 
      type="text" 
      value={ props.value } 
      name={ props.name } 
      onChange={ props.onChange } 
    />
  );
}

export default SearchInput;
