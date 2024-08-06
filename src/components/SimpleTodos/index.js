import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TodoItem from '../TodoItem'
import './index.css'

class SimpleTodos extends Component {
  state = {
    todosList: [],
    inputTodo: '',
    errorMessage: '',
  }

  componentDidMount() {
    const savedTodos = localStorage.getItem('todosList')
    if (savedTodos) {
      this.setState({todosList: JSON.parse(savedTodos)})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {todosList} = this.state
    if (prevState.todosList !== todosList) {
      localStorage.setItem('todosList', JSON.stringify(todosList))
    }
  }

  handleChangeInput = event => {
    this.setState({inputTodo: event.target.value, errorMessage: ''})
  }

  handleDeleteTodo = id => {
    const {todosList} = this.state
    const updatedTodosList = todosList.filter(eachTodo => eachTodo.id !== id)
    this.setState({todosList: updatedTodosList})
  }

  handleAddComment = () => {
    const {inputTodo} = this.state

    if (inputTodo.trim() === '') {
      this.setState({errorMessage: 'Please enter a todo item'})
      return
    }

    const newTodo = {
      id: uuidv4(),
      inputTodo,
      isChecked: false,
    }

    this.setState(prevState => ({
      todosList: [...prevState.todosList, newTodo],
      inputTodo: '',
      errorMessage: '',
    }))
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.handleAddComment()
    }
  }

  handleCheckedToggle = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(eachTodo =>
        eachTodo.id === id
          ? {...eachTodo, isChecked: !eachTodo.isChecked}
          : eachTodo,
      ),
    }))
  }

  handleEditTodoText = (id, editedText) => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(eachTodo =>
        eachTodo.id === id ? {...eachTodo, inputTodo: editedText} : eachTodo,
      ),
    }))
  }

  render() {
    const {todosList, inputTodo, errorMessage} = this.state

    return (
      <div className="todo-bg-container">
        <div className="todos-container">
          <h1 className="heading">
            Welcome! <span className="head">Here is your TodoList</span>
          </h1>
          <input
            type="text"
            className="search-container"
            placeholder="What needs to be done ?"
            onChange={this.handleChangeInput}
            value={inputTodo}
            onKeyPress={this.handleKeyPress}
          />
          <button
            type="button"
            className="Add-button"
            onClick={this.handleAddComment}
          >
            +
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <h1 className="heading">Today</h1>
          <ul className="list-container">
            {todosList.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                todoDetails={eachTodo}
                deleteTodo={this.handleDeleteTodo}
                isCheckedToggle={this.handleCheckedToggle}
                editTodoText={this.handleEditTodoText}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
