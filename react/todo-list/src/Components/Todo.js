import React, { Component } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      todos: [
        {
          value: 'Go to market',
          completed: false,
        },
        {
          value: 'Play FIFA',
          completed: true,
        },
      ],
    };
  }

  insertTodo = (text) => {
    const newTodo = { value: text, completed: false };
    this.setState({
      todos: [...this.state.todos, newTodo],
    });
  };

  removeTodo = (index) => {
    const updatedTodos = this.state.todos.filter((item, idx) => index !== idx);
    this.setState({
      todos: updatedTodos,
    });
  };

  changeTodoStatus = (index) => {
    const updatedTodos = this.state.todos.map((todo, idx) => {
      if (idx !== index) return todo;
      else return { ...todo, completed: !todo.completed };
    });

    this.setState({
      todos: updatedTodos,
    });
  };

  render() {
    return (
      <div>
        <h1>Todo List</h1>

        <AddTodo insertTodo={this.insertTodo} />
        <TodoList
          todoList={this.state.todos}
          removeTodo={this.removeTodo}
          changeTodoStatus={this.changeTodoStatus}
        />
      </div>
    );
  }
}

export default Todo;
