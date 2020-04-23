import React, { useState } from 'react';
import './App.scss';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'Xin chao cac ban' },
    { id: 2, title: 'Xin chao cac ban hi ' },
    { id: 3, title: 'Xin chao cac ban hihi' },
  ]);

  function handleTodoClick(todo) {
    console.log(todo);
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);


  }

  function handleTodoFormSubmit(formValues) {
    console.log('Form submit: ', formValues);
    //add new todo to current todo list

    const newTodo = {
      id: todoList.length + 1,
      ...formValues,
    };

    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  return (
    <div className="app">
      <h1> Welcome to react-hook  and todoList </h1>
      {/* <ColorBox />
       */}
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} />
    </div>
  );
}

export default App;
