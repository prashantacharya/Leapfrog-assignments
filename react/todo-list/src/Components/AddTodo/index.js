import React from 'react';
import { Component } from 'react';
import './addTodo.css';

class AddTodo extends Component {
  constructor() {
    super();

    this.state = {
      text: '',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.text) {
      this.props.insertTodo(this.state.text);
    }
    this.setState({ text: '' });
  };

  handleInputChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="text-field">
          <label>Add New Item</label>
          <input
            type="text"
            value={this.state.text}
            placeholder="Eg: Watch Game of Thrones"
            onChange={this.handleInputChange}
          />
        </div>
        <button onClick={this.handleSubmit}>Add Item</button>
      </form>
    );
  }
}

export default AddTodo;
