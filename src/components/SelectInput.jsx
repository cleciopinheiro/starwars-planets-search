function SelectInput(props) {
  return (
    <select name={ props.name } id={ props.id } value={ props.value } onChange={ props.onChange }>
      {
        props.options.map((option) => (
          <option key={ option } value={ option }>{ option }</option>
        ))
      }
    </select>
  );
}

export default SelectInput;
