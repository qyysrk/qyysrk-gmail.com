import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
  onSubmit: null,
}

function TodoForm(props) {
  const { onSubmit } = props;
  const [value, setValue] = useState('');

  function handleValueChange(e) {
    console.log(e.target.value);
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!onSubmit) return;

    const formValues = {
      title: value,

    };
    onSubmit(formValues);

    //reset form di
    setValue('');

  };



  return (
    <form onSubmit={handleSubmit}>


      <div>
        <input type="text"
          value={value}
          onChange={handleValueChange} />
      </div>
    </form>
  );
}

export default TodoForm;