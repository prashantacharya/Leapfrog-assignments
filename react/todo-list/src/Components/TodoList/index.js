import React, { Component } from 'react';
import { TiTick, TiTimes } from 'react-icons/ti';
import { RiDeleteBin6Line } from 'react-icons/ri';
import './todoList.css';

class TodoList extends Component {
  render() {
    return (
      <ul className="todo-list">
        {this.props.todoList.map((todo, index) => (
          <TodoItem
            key={index}
            index={index}
            item={todo}
            removeTodo={this.props.removeTodo}
            changeTodoStatus={this.props.changeTodoStatus}
          />
        ))}
      </ul>
    );
  }
}

function TodoItem({ item, index, removeTodo, changeTodoStatus }) {
  const todoClass = item.completed ? 'complete' : 'incomplete';

  const handleDelete = () => {
    removeTodo(index);
  };

  const handleStatusChange = () => {
    changeTodoStatus(index);
  };

  return (
    <li className={todoClass}>
      <span>{item.value}</span>
      <div>
        <button onClick={handleDelete}>
          <RiDeleteBin6Line />
        </button>
        <button onClick={handleStatusChange}>
          {item.completed ? <TiTimes /> : <TiTick />}
        </button>
      </div>
    </li>
  );
}

export default TodoList;
