import React, { useState, useEffect } from 'react';
import './App.scss';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';
import Pagination from './components/Pagination';
import queryString from 'query-string';
import PostFiltersForm from './components/PostFilterForm';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'Xin chao cac ban' },
    { id: 2, title: 'Xin chao cac ban hi ' },
    { id: 3, title: 'Xin chao cac ban hihi' },
  ]);

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    title_like: '',
  });




  useEffect(() => {
    async function fetchPostList() {

      try {
        const paramString = queryString.stringify(filters);

        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({ responseJSON });

        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch post list', error.message);
      }
    }
    console.log('Post list effect');
    fetchPostList();
  }, [filters]);

  // useEffect(() => {
  //   console.log('Todo list effect');
  // })

  function handleTodoClick(todo) {
    console.log(todo);
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handlePageChange(newPage) {
    console.log('new page: ', newPage);
    setFilters({
      ...filters,
      _page: newPage,
    })
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

  function handleFiltersChange(newFilters) {
    console.log('New filters', newFilters);
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    })
  }

  return (
    <div className="app">
      <h1> Welcome to react-hook  and todoList, postList, todoForm, todoPagination </h1>
      {/* <ColorBox />
       */}
      {/* <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}


      <PostFiltersForm onSubmit={handleFiltersChange} />
      <PostList posts={postList} />
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
