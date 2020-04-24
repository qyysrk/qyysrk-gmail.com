import React, { useState, useEffect } from 'react';
import './App.scss';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'Xin chao cac ban' },
    { id: 2, title: 'Xin chao cac ban hi ' },
    { id: 3, title: 'Xin chao cac ban hihi' },
  ]);

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function fetchPostList() {

      try {

        const requestUrl = 'http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1';
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({ responseJSON });

        const { data } = responseJSON;
        setPostList(data);
      } catch (error) {
        console.log('Failed to fetch post list', error.message);
      }
    }
    console.log('Post list effect');
    fetchPostList();
  }, []);

  useEffect(() => {
    console.log('Todo list effect');
  })

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
      <h1> Welcome to react-hook  and todoList  & postList </h1>
      {/* <ColorBox />
       */}
      {/* <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}
      <PostList posts={postList} />
    </div>
  );
}

export default App;
