import React, { useState } from "react";

function Form(props) {

    const [name, setName] = useState('');
    const current = new Date();
    const date = current.getDate()
    const month = current.getMonth()
    
    function handleSubmit(e) {
        e.preventDefault();
        if (name){
            props.addTask(name);
        }
        setName("");
      }

    function handleChange(e) {
        setName(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            {date}/{month+1}
          </label>
        </h2>
        <input
            type="text"
            id="new-todo-input"
            className="input input__lg"
            name="text"
            autoComplete="off"
            value={name}
            onChange={handleChange}
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
    );
  }

export default Form;