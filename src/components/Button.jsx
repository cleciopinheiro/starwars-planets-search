function Button(props) {
  return (
    <button type='button' onClick={ props.onClick }>
      { props.value }
    </button>
  );
}

export default Button;
