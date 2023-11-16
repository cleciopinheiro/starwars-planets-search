function RadioInput(props) {
  return (
    <label id={ props.id }>
      <input
        type="radio"
        name={ props.name }
        id={ props.id }
        value={ props.value }
        onChange={ props.onChange }
        defaultChecked={ props.defaultChecked }
      />
      { props.value }
    </label>
  );
}

export default RadioInput;
